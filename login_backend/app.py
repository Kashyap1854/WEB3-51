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
    if is_logged_in():
        # show logout page.
        return f"Hello, {session['username']}! <a href='/logout'>Logout</a>"
    # show link for login and signup page.
    return "Welcome to the login system. <a href='/login'>Login</a> or <a href='/signup'>Sign Up Here</a>"


def is_logged_in():
    # Check if the user is logged in already.
    return "username" in session

# Sign Up route


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        # collecting and storing data from the form.
        username = request.form["username"]
        password = request.form["password"]

        # checking if the user already there in the database.
        existing_user = users_collection.find_one({"username": username})

        # if the user already exists then redirect them to login page.
        if existing_user:
            return "Username already exsist ! <a href='/login'>Login here</a> or <a href='/signup'>Try Again with diffrent credentials.</a>"

        # creating a hashed password.
        hashed_password = generate_password_hash(password)

        # adding the username and hashed password to the database.
        users_collection.insert_one(
            {"username": username, "password": hashed_password})

        # redirecting to the login page.
        return redirect(url_for("login"))

    # redirecting to the signup page.
    return render_template("signup.html")

# Login route


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # collecting and storing data from the form.
        username = request.form["username"]
        password = request.form["password"]

        # checking if the user is already there in the database.
        user = users_collection.find_one({"username": username})

        # checking if the user and password match.
        if user and check_password_hash(user["password"], password):
            # storing the current user name in the session.
            session["username"] = username
            # redirecting to home page.
            return redirect(url_for("home"))

        # redirect to login or signup page.
        return "Invalid username or password. <a href='/login'>Try again</a> or <a href='/signup'>Sign Up Here.</a>"

    # show login page if from is not submitted.
    return render_template("login.html")

# Logout route


@app.route("/logout")
def logout():
    # clearing the current session.
    session.clear()
    # redirecting to home page.
    return redirect(url_for("home"))


# running the flask app.
if __name__ == '__main__':
    app.run(debug=True)
