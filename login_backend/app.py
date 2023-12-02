from flask import Flask, render_template, request, redirect, url_for, session
from db import users as users_collection  # importing database variables.
import secrets
from werkzeug.security import generate_password_hash, check_password_hash

# intializing a flask app.
app = Flask(__name__)
# assingning a secret key to the flask app.
app.secret_key = secrets.token_hex(16)


# Home route+
@app.route("/")
def home():
    return render_template('home.html')


@app.route("/login")
def login():
    return render_template('login.html')


# # Check if the user is logged in

# def is_logged_in():
#     return "username" in session
# # Sign Up route
# @app.route("/signup", methods=["GET", "POST"])
# def signup():
#     if request.method == "POST":
#         username = request.form["username"]
#         password = request.form["password"]
#         existing_user = users_collection.find_one({"username": username})
#         if existing_user:
#             return "Username already exsist ! <a href='/login'>Login here</a> or <a href='/signup'>Try Again</a>"
#         hashed_password = generate_password_hash(password)
#         users_collection.insert_one(
#             {"username": username, "password": hashed_password})
#         return redirect(url_for("login"))
#     return render_template("signup.html")
# # Login route
# @app.route("/login", methods=["GET", "POST"])
# def login():
#     if request.method == "POST":
#         username = request.form["username"]
#         password = request.form["password"]
#         user = users_collection.find_one({"username": username})
#         if user and check_password_hash(user["password"], password):
#             session["username"] = username
#             return redirect(url_for("home"))
#         return "Invalid username or password. <a href='/login'>Try again</a> or <a href='/signup'>Sign Up Here.</a>"
#     return render_template("login.html")
# # Logout route
# @app.route("/logout")
# def logout():
#     session.clear()
#     return redirect(url_for("home"))
if __name__ == '__main__':
    app.run(debug=True)
