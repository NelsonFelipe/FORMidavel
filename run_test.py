from app import create_app
from app.extensions import db
from config import TestingConfig

# Create app using testing configuration (separate DB, active test routes)
app = create_app(config_class=TestingConfig)

if __name__ == '__main__':
    print("⚠️  RUNNING IN TEST MODE (Port 5001) ⚠️")
    print("Database used will be 'test_database.db'.")
    
    # Ensure tables exist in the test database before running
    with app.app_context():
        db.create_all()
        print("✅ Test database tables created successfully.")

    # Run on port 5001 to avoid conflict with dev server (5000)
    app.run(debug=True, port=5001)