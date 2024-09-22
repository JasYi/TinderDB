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
    username = 'lzfpelic'
    password = '00766fa9-d349-4f87-9b85-750bd41b86b6'

    # get organizations
    get_org_url = 'https://cloud.mongodb.com/api/atlas/v1.0/orgs'
    
    org_info = requests.get(get_org_url, auth=HTTPDigestAuth(username, password))
    
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
            for cluster in results['clusters']:
                print("CLUSTER:", cluster)
                data_out = {}
                data_out['id'] = cluster['clusterId']
                data_out['data_size'] = cluster['dataSizeBytes']
                data_out['name'] = cluster['name']
                cluster_info.append(data_out)
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
    print(cluster_info)
    data_out = {
        "pubKey": username,
        "privKey": password,
        "clusters": cluster_info
    }
    return data_out
        
        
    # ############################################
    # FIND CLUSTERS BASED OFF THE SINGLE KEY
    # ############################################