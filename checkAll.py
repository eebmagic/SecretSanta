import json
from cryptography.fernet import Fernet


with open('users.json') as file:
    users = json.load(file)

with open('results/key.key') as file:
    key = file.read()
    cipher = Fernet(key)

with open('results/map.json.enc') as file:
    mapStringEnc = file.read()
    usermap = json.loads(cipher.decrypt(mapStringEnc).decode('utf-8'))

unassigned = []
for user in users:
    try:
        asigned = usermap[user]
    except KeyError:
        unassigned.append(user)

if unassigned:
    print(f"These users are NOT assigned a recipient:")
    for u in unassigned:
        print(f"\t{u}")
else:
    print("ALL ASIGNED :)")