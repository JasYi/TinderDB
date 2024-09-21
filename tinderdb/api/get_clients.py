import requests
from requests.auth import HTTPDigestAuth

from urllib.request import urlopen
import re as r

def getIP():
    d = str(urlopen('http://checkip.dyndns.com/').read())

    return r.compile(r'Address: (\d+\.\d+\.\d+\.\d+)').search(d).group(1)

def query_clients():
    ############################################
    # DUMMY USERNAME AND PASSWORD CHANGE LATER
    ############################################
    username = 'hirjvywh'
    password = 'e8536fcf-ee2b-4ac3-8ac4-c887569c016c'

    ############################################
    # GET PROJECT IDS
    ############################################
    get_proj_ids_url = "https://cloud.mongodb.com/api/atlas/v1.0/groups"
    get_clusters_url = 'https://cloud.mongodb.com/api/atlas/v1.0/clusters'


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

    ############################################
    # GENERATE PROJECT KEYS
    ############################################

    project_keys = []

    for proj in proj_id_res['results']:
        groupId = proj['id']
        print(groupId)
        create_proj_key_url = f'https://cloud.mongodb.com/api/atlas/v1.0/groups/{groupId}/apiKeys'
        print(create_proj_key_url)
        
        data = {
            "desc": "TinderDB",
            "roles": ["ORG_OWNER", "GROUP_OWNER"]
        }
        
        get_proj_key_res = requests.post(create_proj_key_url, auth=HTTPDigestAuth(username, password), json=data)
        
        if get_proj_key_res.status_code == 200:
            print('Authentication successful!')
            print('Response Data:')
            print(get_proj_key_res.text)
            key_res = get_proj_key_res.json()
            project_keys.append([key_res['publicKey'], key_res['privateKey'], groupId])
            curr_id = key_res['id']
            org_ids = [elem for elem in key_res['roles'] if elem['roleName'] == 'ORG_OWNER']
            org_id = org_ids[0]['orgId']
            
            set_ip_url = f'https://cloud.mongodb.com/api/atlas/v1.0/orgs/{org_id}/apiKeys/{curr_id}/accessList'
            ip_data = [{"ipAddress": f'{getIP()}'}]
            print("IP DATA:", ip_data)
            print("IP URL:", set_ip_url)
            ip_res = requests.post(set_ip_url, auth=HTTPDigestAuth(username, password), json=ip_data)
            print("IP RES:", ip_res.text)
            
            
        else:
            print(f'Authentication failed with status code: {get_proj_key_res.status_code}')
            print('Response Data:')
            print(get_proj_key_res.text)
        
        cluster_info = []

    ############################################
    # FIND CLUSTERS BASED OFF KEYS
    ############################################
    for keys in project_keys:
        print("KEYS:", keys)
        
        pub_key = keys[0]
        priv_key = keys[1]
        
        get_proj_url = f'https://cloud.mongodb.com/api/atlas/v1.0/groups/{keys[2]}/clusters'
        
        cluster_res = requests.get(get_proj_url, auth=HTTPDigestAuth(pub_key, priv_key))
        
        if cluster_res.status_code == 200:
            print('Authentication successful!')
            print('Response Data:')
            print(cluster_res.text)
            cluster_info.append(cluster_res.json())
        else:
            print(f'Authentication failed with status code: {cluster_res.status_code}')
            print('Response Data:')
            print(cluster_res.text)
    print(cluster_info)
    return cluster_info
        