import requests
from requests.auth import HTTPDigestAuth

def query_clients():
    username = 'hirjvywh'
    password = 'e8536fcf-ee2b-4ac3-8ac4-c887569c016c'

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

    project_keys = []

    for proj in proj_id_res['results']:
        groupId = proj['id']
        print(groupId)
        create_proj_key_url = f'https://cloud.mongodb.com/api/atlas/v1.0/groups/{groupId}/apiKeys'
        print(create_proj_key_url)
        get_proj_key_res = requests.post(create_proj_key_url, auth=HTTPDigestAuth(username, password))
        
        if get_proj_key_res.status_code == 200:
            print('Authentication successful!')
            print('Response Data:')
            print(get_proj_key_res.text)
            key_res = get_proj_key_res.json()
            for key in key_res['results'][1:]:
                project_keys.append([key['publicKey'], key['privateKey'], groupId])
        else:
            print(f'Authentication failed with status code: {get_proj_key_res.status_code}')
            print('Response Data:')
            print(get_proj_key_res.text)
        
        cluster_info = []

    for keys in project_keys:
        pub_key = keys[0]
        priv_key = keys[1]
        
        get_proj_url = f'https://cloud.mongodb.com/api/atlas/v2/groups/{keys[3]}/clusters'
        
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
        