from settings import db

class Form(db.Model):
    __tablename__ = 'forms'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False) 
    description = db.Column(db.Text)
    questions = db.relationship('Question', backref='form', lazy=True, cascade="all, delete-orphan")

class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.Text, nullable=False) 
    question_type = db.Column(db.String(50), nullable=False) 
    form_id = db.Column(db.Integer, db.ForeignKey('forms.id'), nullable=False) 
    options = db.relationship('Option', backref='question', lazy=True, cascade="all, delete-orphan") 
    answers = db.relationship('Answer', backref='question', lazy=True, cascade="all, delete-orphan")

class Option(db.Model):
    __tablename__ = 'options'

    id = db.Column(db.Integer, primary_key=True)
    option_text = db.Column(db.String(200), nullable=False)  
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)

class Answer(db.Model):
    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    answer_text = db.Column(db.Text)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    selected_options = db.relationship('SelectedOption', backref='answer', lazy=True, cascade="all, delete-orphan")

class SelectedOption(db.Model):
    __tablename__ = 'selected_options'
    
    id = db.Column(db.Integer, primary_key=True)
    answer_id = db.Column(db.Integer, db.ForeignKey('answers.id'), nullable=False)
    option_id = db.Column(db.Integer, db.ForeignKey('options.id'), nullable=False)
    