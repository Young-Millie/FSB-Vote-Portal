
# Statement for enabling the development environment
DEBUG = True

# Define the application directory
import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

APP_PORT = 9000

# Application threads. A common general assumption is
# using 2 per available processor cores - to handle
# incoming requests using one and performing background
# operations using the other.
THREADS_PER_PAGE = 2

# Enable protection agains *Cross-site Request Forgery (CSRF)*
CSRF_ENABLED     = True

# Use a secure, unique and absolutely secret key for
# signing the data.
CSRF_SESSION_KEY = "secret_key"

# Secret key for signing cookies
SECRET_KEY = "A0Zr08j/3yX FSBVOTE !mN]LWX/,?RT"
# Flask-session configs
SESSION_TYPE = 'filesystem'
COOKIE_VALUE = '饼干_fsbvote_v1_fsdb@34vdv'
#COOKIE_VALUE = '饼干'

# Multi-Language Configurations
DEFAULT_LANG = "en"

UPLOAD_DIRECTORY = "./app/static/uploads/"
DOWN_DIRECTORY = "static/uploads/"

# Api config
# API_URL = "http://127.0.0.1:8080"
API_URL = "http://192.168.43.11:8080"
API_KEY = "36f5f6630c61f2d02a6db9a72b05ee4e"

VOTER_DATA_AES_KEY = "V5C%P~:e&WD/w6:^"

EMAIL_SENDER_NAME = "FSB_Portal"
API_VERSION="v1_0"

FORGOT_PASSWORD_SECURITY_KEY = b'E2ZA1QWQo_w7TfyU0gDZJCRJIhRdI02unflt0IB8dKg='

DEF_HEADER = {'Content-Type':'application/json'}
MAIL_HEADER = {}

ACCESS_LOG_PATH = "log/access.log"
EVENT_LOG_PATH = "log/event.log"
ERROR_LOG_PATH = "log/error.log"
SMARTDOG_URL = ""
ALERT_LIST = ""
