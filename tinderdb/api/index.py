from flask import Flask
from api.get_clients import query_clients

app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/get_clients")
def get_clients():
    return query_clients()