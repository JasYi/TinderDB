import requests
from requests.auth import HTTPDigestAuth

from urllib.request import urlopen
import re as r
from pymongo import MongoClient


def call_llm(collection_info, collection_name, db_name):
    import json
    import requests

    stream = False
    url = "https://proxy.tune.app/chat/completions"
    headers = {
        "Authorization": "sk-tune-C9yHcBZABiINkPNonPmTbwkaRrAjDELIUhp", # deprecated key
        "Content-Type": "application/json",
    }
    data = {
    "temperature": 0.9,
        "messages":  [
        {
            "role": "system",
            "content": "You take in the first document from a MongoDB collection and your purpose is to summarize the purpose of the collection in an informative way and to highlight why it deserves to stay in the database. Your goal is to generate a humorous, witty, concise, and informative Tinder-style profile bio for the collection. Make your response casual and trendy, drawing upon recent information and trends. The response should also rizz the reader of the prompt. If the user swipes right the collection is kept and if the user swipes left the collection is archived. Include information about the type of data in the collection, the structure, and its relationships. Keep your response to under 20 words and only respond with the bio and nothing else."
        },
        {
            "role": "user",
            "content": f"Create a witty Tinder-style profile bio for this collection named {collection_name} in the database {db_name}. These are the keys of the first document in the collection: " + str(collection_info)
        }
        ],
        "model": "yi-jason11/yi-jason11-gemma2-9b-it",
        "stream": stream,
        "frequency_penalty":  0.2,
        "max_tokens": 400
    }
    response = requests.post(url, headers=headers, json=data)
    if stream:
        for line in response.iter_lines():
            if line:
                l = line[6:]
                if l != b'[DONE]':
                    print(json.loads(l))
    else:
        return response.json()

def getIP():
    d = str(urlopen('http://checkip.dyndns.com/').read())

    return r.compile(r'Address: (\d+\.\d+\.\d+\.\d+)').search(d).group(1)

def query_clients():
    ############################################
    # DUMMY USERNAME AND PASSWORD CHANGE LATER
    ############################################
    username = 'lzfpelic' # deprecated
    password = '00766fa9-d349-4f87-9b85-750bd41b86b6' # deprecated

    # get organizations
    get_org_url = 'https://cloud.mongodb.com/api/atlas/v1.0/orgs'
    
    org_info = requests.get(get_org_url, auth=HTTPDigestAuth(username, password))
    
    print(org_info.text)
    
    org_id = org_info.json()['results'][0]['id']
    print("CRED ID",org_id)
    
    if org_info.status_code == 200:
        print('Authentication successful!')
        print('Response Data:')
        print(org_info.text)
    else:
        print(f'Authentication failed with status code: {org_info.status_code}')
        print('Response Data:')
        print(org_info.text)
        
    # ############################################
    # GET ORG API KEY
    # ############################################
    
    org_key_url = f'https://cloud.mongodb.com/api/atlas/v1.0/orgs/{org_id}/apiKeys'
    org_key_res = requests.get(org_key_url, auth=HTTPDigestAuth(username, password))
    
    org_key_list = org_key_res.json()['results']
    
    org_keys = [elem for elem in org_key_list if elem['publicKey'] == username][0]['id']
    
    ############################################
    # GET PROJECT IDS
    ############################################
    get_proj_ids_url = "https://cloud.mongodb.com/api/atlas/v1.0/groups"


    proj_ids_response = requests.get(get_proj_ids_url, auth=HTTPDigestAuth(username, password))

    if proj_ids_response.status_code == 200:
        print('Authentication successful!')
        print('Response Data:')
        print(proj_ids_response.text)
    else:
        print(f'Authentication failed with status code: {proj_ids_response.status_code}')
        print('Response Data:')
        print(proj_ids_response.text)

    proj_id_res = proj_ids_response.json()
    
    print(proj_id_res['results'][0]['id'])
    
    # ############################################
    # # GENERATE PROJECT KEYS
    # ############################################

    # project_keys = []

    for proj in proj_id_res['results']:
        groupId = proj['id']
        print(groupId)
        create_proj_key_url = f'https://cloud.mongodb.com/api/atlas/v1.0/groups/{groupId}/apiKeys/{org_keys}'
        # create_proj_key_url = f'https://cloud.mongodb.com/api/atlas/v1.0/groups/{cred_id}/apiKeys'
        print(create_proj_key_url)
        
        data = {
            "desc": "TinderDB Key",
            "roles": ["GROUP_OWNER"]
        }
        
        get_proj_key_res = requests.patch(create_proj_key_url, auth=HTTPDigestAuth(username, password), json=data)
        
        if get_proj_key_res.status_code == 200:
            print('Authentication successful!')
            print('Response Data:')
            print(get_proj_key_res.text)
            # key_res = get_proj_key_res.json()
            # project_keys.append([key_res['publicKey'], key_res['privateKey'], groupId])
            # curr_id = key_res['id']
            # org_ids = [elem for elem in key_res['roles'] if elem['roleName'] == 'ORG_OWNER']
            # org_id = org_ids[0]['orgId']
            
            
            # set_ip_url = f'https://cloud.mongodb.com/api/atlas/v1.0/orgs/{org_id}/apiKeys/{curr_id}/accessList'
            # ip_data = [{"ipAddress": f'{getIP()}'}]
            # print("IP DATA:", ip_data)
            # print("IP URL:", set_ip_url)
            # ip_res = requests.post(set_ip_url, auth=HTTPDigestAuth(username, password), json=ip_data)
            # print("IP RES:", ip_res.text)
            
            
        else:
            print(f'Authentication failed with status code: {get_proj_key_res.status_code}')
            print('Response Data:')
            print(get_proj_key_res.text)

    # ############################################
    # # FIND CLUSTERS BASED OFF KEYS
    # ############################################
    cluster_info = []
    # for keys in project_keys:
    get_proj_url = f'https://cloud.mongodb.com/api/atlas/v1.0/clusters'
    
    cluster_res = requests.get(get_proj_url, auth=HTTPDigestAuth(username, password))
    
    if cluster_res.status_code == 200:
        print('Authentication successful!')
        print('Response Data:')
        print(cluster_res.text)
        cluster_res_json = cluster_res.json()
        for results in cluster_res_json['results']:
            proj_id = results['groupId']
            for cluster in results['clusters']:
                cluster_name = cluster['name']
                get_archive_url = f'https://cloud.mongodb.com/api/atlas/v1.0/groups/{proj_id}/clusters/{cluster_name}/onlineArchives'
                curr_archives_res = requests.get(get_archive_url, auth=HTTPDigestAuth(username, password))
                curr_archives_json = curr_archives_res.json()
                archived_elems = [[name['clusterName'], name['collName'], name['dbName']] for name in curr_archives_json['results']]
                
                
                
                cluster_id = cluster['clusterId']
                # data_out['data_size'] = cluster['dataSizeBytes']


                def format_bytes(bytes_size):
                    """
                    Helper function to convert bytes to a more readable format.
                    """
                    for unit in ['B', 'KB', 'MB', 'GB', 'TB', 'PB']:
                        if bytes_size < 1024:
                            return f"{bytes_size:.2f} {unit}"
                        bytes_size /= 1024
                    return f"{bytes_size:.2f} EB"

                # deprecated credentials
                client = MongoClient(f"mongodb+srv://jasonyi2015:tinderdb@{cluster_name}.ur5xy.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true&appName={cluster_name}") 
                database_names = client.list_database_names()
                for db_name in database_names:
                    if db_name in ['admin', 'local', 'config']:
                        continue
                    db = client.get_database(db_name)
                    collection_names = db.list_collection_names()
                    db_stats = db.command("dbStats")
                    db_size = db_stats['fsUsedSize'] / len(collection_names)
                    for coll_name in collection_names:
                        if [cluster_name, coll_name, db_name] in archived_elems:
                            continue
                        col_stats = db.command("collStats", coll_name)
                        collection = db[coll_name]
                        first_two_docs = list(collection.find().limit(1))
                        first_two_keys = list(first_two_docs)
                        print("FIRST TWO:", first_two_keys)
                        llm_res = call_llm(first_two_keys, coll_name, db_name)
                        print("LLM RES:", llm_res.keys())
                        llm_bio = llm_res['choices'][0]['message']['content'] if 'choices' in llm_res.keys() else ""
                        bytes_data = ((col_stats['totalSize']) * col_stats['scaleFactor']) + db_size
                        usage_data = format_bytes(bytes_data)
                        total_lb = bytes_data / 1000000000 * 4
                        data_out = {}
                        data_out['name'] = cluster_name
                        data_out['groupId'] = proj_id
                        data_out['clusterId'] = cluster_id
                        data_out['clusterName'] = cluster_name
                        data_out['groupId'] = proj_id
                        data_out['collection'] = coll_name
                        data_out['db'] = db_name
                        data_out['data_size'] = usage_data
                        data_out['lb_carbon'] = total_lb
                        data_out['llm_bio'] = llm_bio
                        cluster_info.append(data_out)
                # collections_url = f'https://cloud.mongodb.com/api/atlas/v1.0/groups/{proj_id}/clusters/{cluster_name}/globalWrites'
                # collections_res = requests.get(collections_url, auth=HTTPDigestAuth(username, password))
                
                # collections_json = collections_res.json()
                
                # print("COLLECTIONS:", collections_json)
                
                # for collection in collections_json['managedNamespaces']:
                #     data_out['clusterId'] = cluster_id
                #     data_out['clusterName'] = cluster_name
                #     data_out['groupId'] = proj_id
                #     data_out['collection'] = collection['collection']
                #     data_out['db'] = collection['db']
                #     data_out['data_size'] = data_size
                #     data_out['lb_carbon'] = lb_carbon
                #     cluster_info.append(data_out)
            # for cluster in results['clusters']:
            #     print("CLUSTER:", cluster)
            #     data_out = {}
            #     data_out['id'] = cluster['clusterId']
            #     data_out['data_size'] = cluster['dataSizeBytes']
            #     cluster_info.append(data_out)
            
        # cluster_info.append(cluster_res.json())
    else:
        print(f'Authentication failed with status code: {cluster_res.status_code}')
        print('Response Data:')
        print(cluster_res.text)
    # print(cluster_info)
    data_out = {
        "pubKey": username,
        "privKey": password,
        "clusters": cluster_info
    }
    return data_out
        
        
    # ############################################
    # FIND CLUSTERS BASED OFF THE SINGLE KEY
    # ############################################