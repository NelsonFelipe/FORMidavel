import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'Senha_ultra_secreta_:D'
    basedir = os.path.abspath(os.path.dirname(__file__))
    # Database moved to 'instance' folder
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'instance', 'database.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class TestingConfig(Config):
    TESTING = True
    basedir = os.path.abspath(os.path.dirname(__file__))
    # Test database also in 'instance' folder
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'instance', 'test_database.db')
