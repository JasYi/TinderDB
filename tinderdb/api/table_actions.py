import requests
from requests.auth import HTTPDigestAuth
from pymongo import MongoClient


def del_tab(db_name):
    PASSWORD = "tinderdb"
    APPNAME = "Cluster0"
    # deprecated credentials
    client = MongoClient("mongodb+srv://jasonyi2015:tinderdb@cluster0.ur5xy.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true&appName=Cluster0")
    try:
        db = client.get_database(db_name)
        db.drop_collection("theaters")
        return f"<p>Successfully deleted database!</p>"
    except Exception as e:
        return f"<p>Error occurred when trying to delete DB: {e}</p>"


def move_table(table_name):
    print("Hello world")
    return "Hello World"