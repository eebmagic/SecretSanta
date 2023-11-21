import json

with open('users.json') as file:
    users = json.load(file)

print(f"{len(users)} total users:")
for user, data in users.items():
    print(f"  {data['firstname'].split(' ')[0]}")
