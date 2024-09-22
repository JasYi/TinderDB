from flask import Flask
from api.get_clients import query_clients
from flask_cors import CORS, cross_origin
from table_actions import del_tab

app = Flask(__name__)
CORS(app)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/get_clients")
@cross_origin()  # Enable CORS only for this route
def get_clients():
    return query_clients()

@app.route("/api/delete_table")
def delete_table():
    return del_tab("sample_mflix")