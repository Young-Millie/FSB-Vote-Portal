# Import flask and template operators
from flask import Flask, render_template, session, request, redirect, url_for,make_response,jsonify
from flask_session import Session
from flask_socketio import SocketIO
from app import config
from jinja2 import TemplateNotFound
import json,uuid,datetime
from app import config
from app import language
from app.mainController.services import adminServices

# Define the WSGI application object
app      = Flask(__name__)
socketio = SocketIO(app)

app.config['SESSION_TYPE'] = config.SESSION_TYPE
Session(app)
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['PROPAGATE_EXCEPTIONS'] = True
# Configurations
app.config.from_object(__name__)

cookie_jar = config.COOKIE_VALUE
lang = {}
lang = getattr(language, config.DEFAULT_LANG)

#Add this extension to be able to use 'do' keyword in jinja templates
app.jinja_env.add_extension('jinja2.ext.do')

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
  return render_template('404.html', errormessage = "404: Page not found"), 404

@app.errorhandler(500)
def internal_server_error(error):
  return render_template('404.html', errormessage = "500: Internal Server Error"), 500

@app.errorhandler(502)
def internal_server_error_502(error):
  return render_template('404.html', errormessage = "502: Internal Server Error"), 502

@app.errorhandler(400)
def bad_request(error):
  return render_template('404.html', errormessage = "400: Bad Request"), 400

@app.errorhandler(410)
def bad_request(error):
  return render_template('404.html', errormessage = "410: Page no longer exist"), 410

@app.errorhandler(403)
def bad_request(error):
  return render_template('404.html', errormessage = "403: Resource Access Forbidden"), 403

@app.route('/' , methods=['GET'])
def root_route():
  response = make_response(render_template("index.html"))
  return response



# Import a module / component using its blueprint handler variable (mod_auth)
# from app.home.controllers import home
# from app.customers.controllers import customers

# Register blueprint(s)
# app.register_blueprint(home)
# app.register_blueprint(customers)
# ..
# Build the database:
# This will create the database file using SQLAlchemy
#db.create_all()ss


#########################################################################################
################################ CUSTOM ROUTES ##########################################



@app.route('/login', methods=['POST'])
def login_func():
  try:

    print("In Voter Login")

    session_details = {}
    print(session_details)

    request_data = request.form.to_dict()

    svc = adminServices(session_details)
    result = svc.adminlogin(request_data)

    if result['code'] == 100:
      cookie_value = str(uuid.uuid4()).replace('-', '')[:15]  # Generate a session token value
      session['{0}'.format(cookie_value)] = dict(result['body'][0])
      # Render Response and browser cookie value
      expire_date = datetime.datetime.now()
      expire_date = expire_date + datetime.timedelta(minutes=50)
      response = make_response(jsonify(**result))
      response.set_cookie('{0}'.format(cookie_jar), cookie_value, expires=expire_date)
      # Return response for successful login
      return response

    return jsonify(**result)
  except TemplateNotFound as e:
    print("Template not found Error")
    return render_template("404.html", userdata=session_details, errormessage="Resource not found. Please try again later")

@app.route('/logout', methods=['GET'])
def voter_signout():
    print("In Vote logout")

    cookie_id = request.cookies.get('{0}'.format(cookie_jar)) # GET previous cookies

    response = make_response(redirect(url_for("root_route")))
    if cookie_id != None:
        session.pop(cookie_id, None)  # Clear existing session data
        response.set_cookie('{0}'.format(cookie_jar), '', expires=0) # Expire existing cookie data
    return response

@app.route('/vote', methods=['GET'])
def vote_page():
  try:
    print("Entering Vote Page Controller")
    # access session data (session['k']=v)
    try:
      cookie_id = request.cookies.get('{0}'.format(cookie_jar))
    except Exception as e:
      cookie_id = None

    if cookie_id != None:
      session_details = session['{0}'.format(cookie_id)]
      print("Session Data")
      print(session_details)
    else:
      return redirect(url_for("root_route"))

    svc = adminServices(session_details)

    # if request.method == 'POST':
    #   print("In POST")
    #   data = svc.getPositionsAndCandidates(request.form.to_dict())
    #   return json.dumps(data)

    data = svc.getPositionsAndCandidates({})

    print("Printing data in controller\n{}".format(data))

    user_lang = lang

    if "lang" in session_details:
      user_lang = getattr(language, session_details['lang'])

    return render_template("vote.html", lang=user_lang, mStyle=language.STYLE['customers_style'],
                           userdata=session_details, data=data)
  except TemplateNotFound as e:
    print("Template not found Error")
    return render_template("404.html", userdata=session_details, errormessage="Resource not found. Please try again later")


@app.route('/submitvote', methods=['POST'])
def submit_vote_page():
  try:
    print("Entering Submit Vote Page Controller")
    # access session data (session['k']=v)
    try:
      cookie_id = request.cookies.get('{0}'.format(cookie_jar))
    except Exception as e:
      cookie_id = None

    if cookie_id != None:
      session_details = session['{0}'.format(cookie_id)]
      print("Session Data")
      print(session_details)
    else:
      ses_resp = {"code": 105, "message": "Your Session has expired! Please call Admin."}
      # TODO: Trigger a call to alert monitoring System or Admin
      return json.dumps(ses_resp)

    svc = adminServices(session_details)
    data = svc.submitVotes(request.form.to_dict())
    return json.dumps(data)

  except Exception as e:
    print("Exception occurred")
    return render_template("404.html", userdata=session_details, errormessage="An Error occured, please try again later")