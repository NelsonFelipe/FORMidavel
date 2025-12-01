from flask import request, Blueprint, jsonify
from api.extensions import db
from api.models import Form, Question, Option, Submission, Answer, SelectedOption

# Create a single Blueprint for the entire API
api = Blueprint('api', __name__)

# --- Form CRUD Routes ---

@api.route('/forms', methods=['POST'])
def create_form():
    """
    Creates a new form from a JSON payload.
    """
    data = request.get_json()
    if not data or not data.get('title'):
        return jsonify({'error': 'Title is required'}), 400

    new_form = Form(
        title=data['title'],
        description=data.get('description', '')
    )
    db.session.add(new_form)
    db.session.flush()

    for q_data in data.get('questions', []):
        new_question = Question(
            question_text=q_data['question_text'],
            question_type=q_data['question_type'],
            form_id=new_form.id
        )
        db.session.add(new_question)
        db.session.flush()

        if q_data['question_type'] in ['multiple_choice', 'checkbox']:
            for opt_text in q_data.get('options', []):
                new_option = Option(
                    option_text=opt_text,
                    question_id=new_question.id
                )
                db.session.add(new_option)
    
    db.session.commit()
    return jsonify(new_form.to_dict()), 201


@api.route('/forms', methods=['GET'])
def get_forms():
    """
    Returns a list of all forms (summary data).
    """
    forms = Form.query.all()
    forms_list = [{
        'id': form.id,
        'title': form.title,
        'description': form.description,
        'question_count': len(form.questions),
        'submissions_count': len(form.submissions)
    } for form in forms]
    return jsonify(forms_list)

@api.route('/forms/<int:form_id>', methods=['GET'])
def get_form(form_id):
    """
    Returns all data for a single form in JSON format.
    """
    form = Form.query.get_or_404(form_id)
    return jsonify(form.to_dict())

@api.route('/forms/<int:form_id>', methods=['DELETE'])
def delete_form(form_id):
    """
    Deletes a form.
    """
    form = Form.query.get_or_404(form_id)
    db.session.delete(form)
    db.session.commit()
    return jsonify({'message': 'Form deleted successfully'}), 200

@api.route('/forms/<int:form_id>', methods=['PUT'])
def update_form(form_id):
    """
    Updates a form from a JSON payload.
    """
    form = Form.query.get_or_404(form_id)
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid data'}), 400

    form.title = data.get('title', form.title)
    form.description = data.get('description', form.description)

    # Delete existing questions and options
    for question in form.questions:
        db.session.delete(question)
    db.session.flush()

    # Recreate questions and options from payload
    for q_data in data.get('questions', []):
        new_question = Question(
            question_text=q_data['question_text'],
            question_type=q_data['question_type'],
            form_id=form.id
        )
        db.session.add(new_question)
        db.session.flush()

        if q_data['question_type'] in ['multiple_choice', 'checkbox']:
            option_texts = q_data.get('options', [])
            for opt_text in option_texts:
                if isinstance(opt_text, str):
                    new_option = Option(
                        option_text=opt_text,
                        question_id=new_question.id
                    )
                    db.session.add(new_option)

    db.session.commit()
    return jsonify(form.to_dict())

# --- Submission Route ---

@api.route('/forms/<int:form_id>/responses', methods=['POST'])
def submit_response(form_id):
    """
    Submits a response to a form.
    """
    form = Form.query.get_or_404(form_id)
    data = request.get_json()
    answers_data = data.get('answers', {})

    if not answers_data:
        return jsonify({'error': 'No answers provided'}), 400

    submission = Submission(form_id=form.id)
    db.session.add(submission)
    db.session.flush()

    for question in form.questions:
        q_id_str = str(question.id)
        if q_id_str in answers_data:
            user_response = answers_data[q_id_str]
            
            if question.question_type in ['short_answer', 'long_answer']:
                if user_response:
                    answer = Answer(
                        answer_text=str(user_response),
                        question_id=question.id,
                        submission_id=submission.id
                    )
                    db.session.add(answer)

            elif question.question_type in ['multiple_choice', 'checkbox']:
                answer = Answer(question_id=question.id, submission_id=submission.id)
                db.session.add(answer)
                db.session.flush()

                response_ids = user_response if isinstance(user_response, list) else [user_response]
                for opt_id in response_ids:
                    if opt_id:
                        sel_opt = SelectedOption(answer_id=answer.id, option_id=int(opt_id))
                        db.session.add(sel_opt)

    db.session.commit()
    return jsonify({'message': 'Response submitted successfully', 'submission_id': submission.id}), 201

# --- Utility / Demo Route ---

@api.route('/demo')
def demo():
    """
    Creates/verifies a demonstration form to populate the database.
    """
    demo_title = "Formulário de Demonstração"
    form = Form.query.filter_by(title=demo_title).first()
    
    if not form:
        form = Form(
            title=demo_title, 
            description="Este é um exemplo de como seus formulários ficarão. Experimente responder para ver a mágica acontecer! ✨"
        )
        db.session.add(form)
        db.session.commit()
        
        q1 = Question(question_text="Qual é o seu nome?", question_type="short_answer", form_id=form.id)
        q2 = Question(question_text="Como você avalia este design?", question_type="multiple_choice", form_id=form.id)
        q3 = Question(question_text="Quais recursos você mais gostou?", question_type="checkbox", form_id=form.id)
        q4 = Question(question_text="Deixe uma sugestão para a equipe:", question_type="long_answer", form_id=form.id)
        db.session.add_all([q1, q2, q3, q4])
        db.session.commit()
        
        op1 = Option(option_text="Incrível", question_id=q2.id)
        op2 = Option(option_text="Bom", question_id=q2.id)
        op3 = Option(option_text="Pode melhorar", question_id=q2.id)
        chk1 = Option(option_text="Modo Escuro", question_id=q3.id)
        chk2 = Option(option_text="Facilidade de uso", question_id=q3.id)
        chk3 = Option(option_text="Design Limpo", question_id=q3.id)
        db.session.add_all([op1, op2, op3, chk1, chk2, chk3])
        
        db.session.commit()
    
    return jsonify({
        "message": "Demo form created/verified successfully.",
        "form_id": form.id,
        "form_title": form.title
    })
