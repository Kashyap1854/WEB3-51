from flask import Flask, render_template, request, redirect, url_for, session
from db import users as users_collection  # importing database variables.
import secrets
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message
from itsdangerous import SignatureExpired, URLSafeTimedSerializer
# intializing a flask app.
app = Flask(__name__)
# assingning a secret key to the flask app.
app.secret_key = secrets.token_hex(16)
app.config.from_pyfile('config.cfg')
salt = secrets.token_hex(16)
mail = Mail(app)

# Home route


@app.route("/")
def home():
    return render_template('home.html')

# login route


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        # collecting and storing data from the form.
        email = request.form["email"]
        password = request.form["password"]
        print("Email: %s" % email)
        print("Password: %s" % password)
        # checking if the user is already there in the database.
        user = users_collection.find_one({"email": email})
        print("User: %s" % user)

        # checking if the user and password match.
        if user and check_password_hash(user["password"], password):
            # storing the current user name in the session.
            session["email"] = email
            # redirecting to home page.
            return redirect(url_for("dashboard"))
        else:
            return render_template('login.html', message=" Wrong password or username. Please try Again ! ")
    return render_template('login.html')

# register route


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form['Email']
        username = request.form['Username']
        password = request.form['Password']
        person = request.form['Person']
        # printing results ...
        print(" Email : " + email)
        print(" Username : " + username)
        print(" password : " + password)
        print(" Person : " + person)
        # check if user already exsist.
        if users_collection.find_one({"username": username}) or users_collection.find_one({'email': email}):
            return render_template('login.html', message="User already Exsist! Please login.")
        # generating data.
        hashed = generate_password_hash(password)
        data = {
            "username": username,
            "password": hashed,
            "email": email,
            "Type": person
        }
        # check if verification link has been sent.
        if send_verification_link(data):
            return render_template('login.html', message=" Verification link has been sent to your mailbox. Please check your mailbox")
    return render_template('login.html')

# about route


@app.route("/about")
def about():
    return render_template('about.html')

# dashboard route


@app.route("/dashboard")
def dashboard():
    return render_template('main.html')

# logout route.


@app.route("/logout", methods=["GET", "POST"])
def logout():
    if request.method == "POST":
        session.clear()
        return render_template('home.html')

# contact route


@app.route("/contact")
def contact():
    return render_template('contact.html')


@app.route("/profile")
def profile():
    return render_template('profile.html')


@app.route("/note")
def note():
    return render_template('note.html')


s = URLSafeTimedSerializer(app.secret_key)


def send_verification_link(data):
    token = s.dumps(data, salt=salt)
    link = url_for('activate', token=token, _external=True)
    msg = Message(
        'Account Verification for MED Vault',
        recipients=[data.get('email')],
        body=" Please use the given to activate your account {}".format(
            link)
    )
    try:
        mail.send(msg)
    except Exception as e:
        print(e)
        return False
    print("Sent message sucessfully!")
    return True


@app.route('/activate/<token>')
def activate(token):
    try:
        data = s.loads(token, salt=salt, max_age=180)
    except SignatureExpired:
        return "Session expired !"
    users_collection.insert_one(data)
    return redirect(url_for('dashboard'))


if __name__ == '__main__':
    app.run(debug=True)
