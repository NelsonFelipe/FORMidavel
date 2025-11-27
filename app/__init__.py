from flask import Flask
from config import Config
from app.extensions import db, migrate

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Register Blueprints
    from app.routes import main
    app.register_blueprint(main)
    
    # Register test routes ONLY if in testing mode
    if app.config.get('TESTING'):
        from app.test_routes import test_bp
        app.register_blueprint(test_bp)

    return app
