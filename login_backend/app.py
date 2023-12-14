from flask import Flask, render_template, request, redirect, url_for, session
from db import users as users_collection  # importing database variables.
import secrets
from werkzeug.security import generate_password_hash, check_password_hash

# intializing a flask app.
app = Flask(__name__)
# assingning a secret key to the flask app.
app.secret_key = secrets.token_hex(16)


# Home route
@app.route("/")
def home():
    return render_template('home.html')


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
        # if user and check_password_hash(user["password"], password):
        if user and check_password_hash(user["password"], password):
            # storing the current user name in the session.
            session["email"] = email
            # redirecting to home page.
            return redirect(url_for("dashboard"))
        else:
            return render_template('login.html', message=" Wrong password or username. Please try Again ! ")
    return render_template('login.html')


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form['Email']
        username = request.form['Username']
        password = request.form['Password']
        person = request.form['Person']
        print(" Email : " + email)
        print(" Username : " + username)
        print(" password : " + password)
        print(" Person : " + person)
        hashed = generate_password_hash(password)
        if users_collection.find_one({"username": username}) or users_collection.find_one({'email': email}):
            return render_template('login.html', message="User already Exsist! Please login.")
        users_collection.insert_one(
            {
                "username": username,
                "password": hashed,
                "email": email,
                "Type": person
            }
        )
        return render_template('login.html', message="Registration successful ! Please login ")
    return render_template('login.html')


@app.route("/about")
def about():
    return render_template('about.html')


@app.route("/dashboard")
def dashboard():
    return render_template('main.html')


@app.route("/logout", methods=["GET", "POST"])
def logout():
    if request.method == "POST":
        session.clear()
        return render_template('home.html')


if __name__ == '__main__':
    app.run(debug=True)
