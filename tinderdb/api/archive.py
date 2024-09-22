import requests
from requests.auth import HTTPDigestAuth
from datetime import datetime, timedelta

def archive_client(groupId, clusterName, pubKey, privKey):
    # Archive the client
    print("Archiving client")
    group_id = '66ee585c6e6f185360fe907e'
    cluster_name = 'Cluster0'
    username = 'lzfpelic'
    password = '00766fa9-d349-4f87-9b85-750bd41b86b6'
    
    collection_name = 'comments'
    
    db_name = 'sample_mflix'
    
    now = datetime.now().isoformat()
    
    archive_data = {
        "collName": collection_name,
        "criteria": {
            "type": "DATE",
            "dateField": now,
            "expireAfterDays": 0
        },
        "dbName": db_name,
        "schedule": {
            "type": "DEFAULT"
        }
    }
    
    archive_res = requests.post(f'https://cloud.mongodb.com/api/atlas/v1.0/groups/{group_id}/clusters/{cluster_name}/onlineArchives', json=archive_data, auth=HTTPDigestAuth(username, password))

    print(archive_res.text)
    return archive_res.text    