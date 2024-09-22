import requests
from requests.auth import HTTPDigestAuth
from datetime import datetime, timedelta
from pymongo import MongoClient

def archive_client(groupId, clusterName, dbName, collectionName, pubKey, privKey):
    # Archive the client
    print("Archiving client")
    group_id = groupId
    cluster_name = clusterName
    username = 'lzfpelic'
    password = '00766fa9-d349-4f87-9b85-750bd41b86b6'
    
    collection_name = collectionName
    
    db_name = dbName
    
    now = datetime.now().isoformat()
    
    
    
    archive_data = {
        "collName": "comments",
        "criteria": {
            "type": "CUSTOM",
            "query": "{ _id: { $exists: true } }"
        },
        "dbName": "sample_mflix",
        "dataExpirationRule": {
            "expireAfterDays": 7
            },
        "partitionFields": [
            {
            "fieldName": "string",
            "order": 0
            }
        ],
        "schedule": {
            "type": "DEFAULT"
        }
    }
        
    archive_url = f'https://cloud.mongodb.com/api/atlas/v1.0/groups/{group_id}/clusters/{cluster_name}/onlineArchives'
    
    print(archive_url)
    archive_res = requests.post(archive_url, json=archive_data, auth=HTTPDigestAuth(username, password))


    print(archive_res.text)
    return archive_res.text    