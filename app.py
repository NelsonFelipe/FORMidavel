from flask import Flask, redirect, url_for, render_template, request
from models import Form, Question, Option
from settings import url, db

app = Flask(__name__)
app.secret_key = b'Senha_ultra_secreta_:D'
app.config['SQLALCHEMY_DATABASE_URI'] = url
db.init_app(app)

with app.app_context():
    db.create_all()
    
@app.route('/', methods=['GET'])
def home():
    forms = Form.query.all()
    return render_template('home.html', forms=forms)

# ver os formulários
@app.route('/forms')
def all_forms():
    forms = Form.query.all()
    return render_template('forms.html', forms=forms)

# editar os formulários
@app.route('/edit_form/<int:form_id>', methods=['GET', 'POST'])
def edit_form(form_id):
    form = db.session.get(Form, form_id)
    questions = db.session.query(Question).filter(Question.form_id == form_id).all()

    if request.method == 'POST':
 
        form.title = request.form['title']
        form.description = request.form['description']
        db.session.commit()

        questions_data = request.form.getlist('questions')
        
        for index, question in enumerate(questions_data):
            question_text = request.form[f'questions[{index}][text]']
            question_type = request.form[f'questions[{index}][type]']

            question_db = questions[index]  
            question_db.question_text = question_text
            question_db.question_type = question_type
            db.session.commit()


            if question_type in ['multiple_choice', 'checkbox']:
                options = request.form.getlist(f'questions[{index}][options][]')
                

                db.session.query(Option).filter(Option.question_id == question_db.id).delete()

                for option_text in options:
                    new_option = Option(option_text=option_text, question_id=question_db.id)
                    db.session.add(new_option)
                
                db.session.commit()

        return redirect(url_for('all_forms')) 

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

# criar um novo formulário
@app.route('/create_form', methods=['GET', 'POST'])
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
                        
                        return redirect(url_for('create_form'))
                    
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
                        return redirect(url_for('create_form'))
                     
        db.session.add(new_form) 
        db.session.commit() 

        return redirect(url_for('all_forms'))
    
    else:

        return render_template('create_form.html')
    

    
if __name__ == '__main__':
    app.run(debug=True)