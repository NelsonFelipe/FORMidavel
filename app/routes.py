from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.extensions import db
from app.models import Form, Question, Option, Submission, Answer, SelectedOption

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def home():
    forms = Form.query.all()
    return render_template('home.html', forms=forms)

# ver os formulários
@main.route('/forms')
def all_forms():
    forms = Form.query.all()
    return render_template('forms.html', forms=forms)

# Rota de Demonstração (Cria/Carrega um form exemplo e mostra)
@main.route('/demo')
def demo():
    # Procura se já existe o formulário de demo para não criar duplicatas
    demo_title = "Formulário de Demonstração"
    form = Form.query.filter_by(title=demo_title).first()
    
    if not form:
        # Cria o formulário se não existir
        form = Form(
            title=demo_title, 
            description="Este é um exemplo de como seus formulários ficarão. Experimente responder para ver a mágica acontecer! ✨"
        )
        db.session.add(form)
        db.session.commit() # Commit inicial para ter o ID do form
        
        # Adiciona perguntas variadas para mostrar os recursos
        # 1. Texto Curto
        q1 = Question(question_text="Qual é o seu nome?", question_type="short_answer", form_id=form.id)
        db.session.add(q1)
        
        # 2. Múltipla Escolha
        q2 = Question(question_text="Como você avalia este design?", question_type="multiple_choice", form_id=form.id)
        db.session.add(q2)
        db.session.commit() # Commit para ter ID da q2
        
        op1 = Option(option_text="Incrível", question_id=q2.id)
        op2 = Option(option_text="Bom", question_id=q2.id)
        op3 = Option(option_text="Pode melhorar", question_id=q2.id)
        db.session.add_all([op1, op2, op3])
        
        # 3. Checkbox
        q3 = Question(question_text="Quais recursos você mais gostou?", question_type="checkbox", form_id=form.id)
        db.session.add(q3)
        db.session.commit() # Commit para ter ID da q3
        
        chk1 = Option(option_text="Modo Escuro", question_id=q3.id)
        chk2 = Option(option_text="Facilidade de uso", question_id=q3.id)
        chk3 = Option(option_text="Design Limpo", question_id=q3.id)
        db.session.add_all([chk1, chk2, chk3])
        
        # 4. Texto Longo
        q4 = Question(question_text="Deixe uma sugestão para a equipe:", question_type="long_answer", form_id=form.id)
        db.session.add(q4)
        
        db.session.commit()
    
    # Redireciona para a visualização pública deste formulário
    return redirect(url_for('main.view_form', form_id=form.id))

# Responder Formulário (Pública)
@main.route('/form/<int:form_id>', methods=['GET', 'POST'])
def view_form(form_id):
    form = db.session.get(Form, form_id)
    if not form:
        return render_template('404.html'), 404 

    if request.method == 'POST':
        # Criar Submission
        submission = Submission(form_id=form.id)
        db.session.add(submission)
        db.session.commit()

        for question in form.questions:
            field_name = f"question_{question.id}"
            
            if question.question_type in ['short_answer', 'long_answer']:
                text_answer = request.form.get(field_name)
                if text_answer:
                    answer = Answer(
                        answer_text=text_answer,
                        question_id=question.id,
                        submission_id=submission.id
                    )
                    db.session.add(answer)

            elif question.question_type == 'multiple_choice':
                selected_option_id = request.form.get(field_name)
                if selected_option_id:
                    answer = Answer(
                        question_id=question.id,
                        submission_id=submission.id
                    )
                    db.session.add(answer)
                    db.session.commit() 
                    
                    sel_opt = SelectedOption(
                        answer_id=answer.id,
                        option_id=int(selected_option_id)
                    )
                    db.session.add(sel_opt)

            elif question.question_type == 'checkbox':
                selected_ids = request.form.getlist(field_name)
                if selected_ids:
                    answer = Answer(
                        question_id=question.id,
                        submission_id=submission.id
                    )
                    db.session.add(answer)
                    db.session.commit()

                    for opt_id in selected_ids:
                        sel_opt = SelectedOption(
                            answer_id=answer.id,
                            option_id=int(opt_id)
                        )
                        db.session.add(sel_opt)
        
        db.session.commit()
        return render_template('thank_you.html', form=form)

    return render_template('view_form.html', form=form)


# editar os formulários
@main.route('/edit_form/<int:form_id>', methods=['GET', 'POST'])
def edit_form(form_id):
    form = db.session.get(Form, form_id)
    questions = db.session.query(Question).filter(Question.form_id == form_id).order_by(Question.id).all()

    if request.method == 'POST':
        form.title = request.form['title']
        form.description = request.form['description']
        
        # 1. Atualizar perguntas existentes
        i = 0
        while f'questions[{i}][text]' in request.form:
            if i < len(questions):
                q_db = questions[i]
                q_db.question_text = request.form[f'questions[{i}][text]']
                q_db.question_type = request.form[f'questions[{i}][type]']
                
                if q_db.question_type in ['multiple_choice', 'checkbox']:
                    Option.query.filter_by(question_id=q_db.id).delete()
                    opts = request.form.getlist(f'questions[{i}][options][]')
                    for opt_text in opts:
                        if opt_text:
                            new_opt = Option(option_text=opt_text, question_id=q_db.id)
                            db.session.add(new_opt)
            i += 1
            
        # 2. Criar novas perguntas
        new_q_texts = request.form.getlist('quest')
        new_q_types = request.form.getlist('type')
        
        for j in range(len(new_q_texts)):
            q_text = new_q_texts[j]
            q_type = new_q_types[j]
            
            new_q = Question(question_text=q_text, question_type=q_type, form_id=form.id)
            db.session.add(new_q)
            # Opções de novas perguntas não suportadas neste fix rápido devido à limitação do JS
            # (Requer refatoração maior do frontend para enviar JSON estruturado ou nomes indexados corretos)

        db.session.commit()
        flash('Formulário atualizado com sucesso!', 'success') 
        return redirect(url_for('main.all_forms')) 

    questions_with_options = []
    for question in questions:
        question_data = {
            'text': question.question_text,  
            'type': question.question_type, 
            'options': [] 
        }

        if question.question_type in ['multiple_choice', 'checkbox']:
            options = db.session.query(Option).filter(Option.question_id == question.id).all()
            question_data['options'] = [option.option_text for option in options] 

        questions_with_options.append(question_data)

    form_data = {
        'title': form.title,
        'description': form.description,
        'questions': questions_with_options
    }

    return render_template('edit_form.html', form=form, form_data=form_data)

@main.route('/delete_form/<int:form_id>', methods=['POST'])
def delete_form(form_id):
    form = db.session.get(Form, form_id)
    if form:
        db.session.delete(form)
        db.session.commit()
        flash('Formulário excluído com sucesso!', 'success')
    else:
        flash('Formulário não encontrado.', 'error')
    return redirect(url_for('main.all_forms'))

# criar um novo formulário
@main.route('/create_form', methods=['GET', 'POST'])
def create_form():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        
        new_form = Form(title=title, description=description)

        question_texts = request.form.getlist('quest')
        question_types = request.form.getlist('type')

        for i in range(len(question_texts)):
            
            question_text = question_texts[i]
            question_type = question_types[i]

            new_question = Question(question_text=question_text, question_type=question_type, form=new_form)
            db.session.add(new_question)
            
            if question_type in ['multiple_choice', 'checkbox']:

                # Tratamento de múltipla escolha
                if question_type == 'multiple_choice':

                    option_size = 0
                    while True:
                        if f'opcao_text_{option_size}' in request.form:
                            option_size += 1
                        else:
                            break

                    option_text_list = []
                    for j in range(option_size):
                        option_text_list.append(request.form.get(f'opcao_text_{j}'))

                    for option_text in option_text_list:
                        if option_text:
                            new_option = Option(option_text=option_text, question=new_question)
                            db.session.add(new_option)
                            
                    if option_size == 0:
                        
                        return redirect(url_for('main.create_form'))
                    
                # tratamento de caixa de seleção
                elif question_type == 'checkbox':

                    option_size = 0
                    while True:
                        if f'opcao_text_check_{option_size}' in request.form:
                            option_size += 1
                        else:
                            break

                    option_text_list = []
                    for j in range(option_size):
                        option_text_list.append(request.form.get(f'opcao_text_check_{j}'))

                    for option_text in option_text_list:
                        if option_text:
                            new_option = Option(option_text=option_text, question=new_question)
                            db.session.add(new_option)
                            
                    if option_size == 0:
                        return redirect(url_for('main.create_form'))
                     
        db.session.add(new_form) 
        db.session.commit() 
        flash('Formulário criado com sucesso!', 'success')
        return redirect(url_for('main.all_forms'))
    
    else:

        return render_template('create_form.html')

@main.route('/privacy')
def privacy():
    return render_template('privacy.html')

@main.route('/terms')
def terms():
    return render_template('terms.html')