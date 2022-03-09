"""
The File contains the script that starts the application
"""
# Run a application server.
from app.__init__ import app
from app.config import APP_PORT,DEBUG
#import app
if __name__ == '__main__':
	app.run(host='0.0.0.0',  port=APP_PORT, debug=DEBUG)
