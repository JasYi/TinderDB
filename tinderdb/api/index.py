from flask import Flask, request
from api.get_clients import query_clients
from api.archive import archive_client
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

@app.route("/api/archive")
def archive():
    groupId = request.args.get('groupId')
    clusterName = request.args.get('clusterName')
    dbName = request.args.get('dbName')
    collectionName = request.args.get('collectionName')
    privKey = request.args.get('privKey')
    pubKey = request.args.get('pubKey')
    return archive_client(groupId, clusterName, dbName, collectionName, pubKey, privKey)