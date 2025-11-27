from flask import Blueprint, current_app
from app.extensions import db
from app.models import Form, Question, Option, Submission, Answer, SelectedOption

test_bp = Blueprint('test', __name__)

@test_bp.route('/test/reset_db', methods=['POST'])
def reset_db():
    # Security lock: Only allow if TESTING config is True
    if not current_app.config.get('TESTING'):
        return {'error': 'This route is only allowed in testing mode'}, 403

    try:
        db.drop_all()
        db.create_all()
        return {'status': 'Database reset success'}, 200
    except Exception as e:
        return {'error': str(e)}, 500

@test_bp.route('/test/seed_form', methods=['POST'])
def seed_form():
    if not current_app.config.get('TESTING'):
        return {'error': 'This route is only allowed in testing mode'}, 403

    form = Form(title="Formulário Cypress", description="Formulário criado automaticamente pelo Cypress")
    db.session.add(form)
    
    # Add a default question so answering tests work
    q1 = Question(question_text="Qual seu framework favorito?", question_type="short_answer", form=form)
    db.session.add(q1)

    db.session.commit()
    
    return {'status': 'Seeded', 'id': form.id}, 201

@test_bp.route('/test/get_submission_data/<form_id>', methods=['GET'])
def get_submission_data(form_id):
    if not current_app.config.get('TESTING'):
        return {'error': 'This route is only allowed in testing mode'}, 403
    
    submission = Submission.query.filter_by(form_id=form_id).order_by(Submission.created_at.desc()).first()
    
    if not submission:
        return {'error': 'No submission found'}, 404

    data = {
        'submission_id': submission.id,
        'form_id': submission.form_id,
        'answers': []
    }

    for answer in submission.answers:
        ans_data = {
            'question_id': answer.question_id,
            'answer_text': answer.answer_text,
            'selected_options': [so.option_id for so in answer.selected_options]
        }
        data['answers'].append(ans_data)
    
    return data, 200
