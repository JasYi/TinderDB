from flask import Flask, request
from api.get_clients import query_clients
from api.archive import archive_client
from flask_cors import CORS, cross_origin

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
    del_tab('ajbose02')
    return "<p>Bye, World!</p>"

@app.route("/api/archive")
def archive():
    groupId = request.args.get('groupId')
    clusterName = request.args.get('clusterName')
    privKey = request.args.get('privKey')
    pubKey = request.args.get('pubKey')
    return archive_client(groupId, clusterName, pubKey, privKey)