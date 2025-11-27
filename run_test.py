from app import create_app
from config import TestingConfig

# Create app using testing configuration, it separate DB, active test routes
app = create_app(config_class=TestingConfig)

if __name__ == '__main__':
    print("⚠️  RUNNING IN TEST MODE (Port 5001) ⚠️")
    print("Database used will be 'test_database.db'.")
    app.run(debug=True, port=5001)