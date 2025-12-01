from flask import Flask
from config import Config
from api.extensions import db, migrate, cors

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    # Setup CORS to allow requests from our frontend
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    # Register API Blueprint
    from api.routes import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api/v1')
    
    # Register test routes ONLY if in testing mode
    if app.config.get('TESTING'):
        from api.test_routes import test_bp
        app.register_blueprint(test_bp)

    return app
