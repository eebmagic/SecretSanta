import numpy as np
import random
import json
import io
import argparse
import hashlib

import networkx as nx
import matplotlib.pyplot as plt

from encrypt import saveFiles


parser = argparse.ArgumentParser(description='Generate a secret santa graph')
parser.add_argument('--silent', action='store_true', help='Do not display the graph')
args = parser.parse_args()

def genGraph(N, banned={}):
    if type(N) == int:
        available = list(range(N))
    elif type(N) == list:
        available = N.copy()
    else:
        assert False, f"type(N) should be int or list, but got: {type(N)}"
    original = available.copy()


    G = nx.DiGraph()
    G.add_nodes_from(available)


    # Check no self-loops
    validShuffle = False
    while not validShuffle:
        random.shuffle(available)
        print(f"Shuffled: {hashlib.sha256(str(available).encode()).hexdigest()[:8]}")

        # Check that no one is buying for themselves
        noSelfLoops = not any([name == available[i] for i, name in enumerate(original)])
        if not noSelfLoops:
            print("Reshuffling because of self loop")

        # Check that there are no pairs on the blacklist
        noBannedEdges = True
        for i, name in enumerate(original):
            buysFor = available[i]
            if (name in banned):
                if (buysFor in banned[name]):
                    print(f"Reshuffling because of breaking edge: {name} -> {buysFor}")
                    noBannedEdges = False
                    break

        validShuffle = noSelfLoops and noBannedEdges


    # Add edges to graph
    edges = {name: available[i] for i, name in enumerate(original)}
    for a, b in edges.items():
        G.add_edge(a, b)

    return G, edges


with open('users.json') as file:
    users = json.load(file)
    names = list(users.keys())
    labels = {user: users[user]['firstname'].split(' ')[0] for user in users}
with open('blacklist.json') as file:
    bannedPairs = json.load(file)

print(f"There are: {len(names)} names")
bans = {}
for a, b in bannedPairs:
    bans[a] = bans.get(a, []) + [b]
    bans[b] = bans.get(b, []) + [a]
print(f"Made bans: {bans}")


# Make the graph
G, edges = genGraph(names, banned=bans)
edgeStr = json.dumps(edges, indent=2)


# Make the plot image
plt.figure(figsize=(20, 15))
pos = nx.planar_layout(G)
nx.draw_networkx_nodes(G, pos)
nx.draw_networkx_edges(G, pos)
nx.draw_networkx_labels(G, pos, labels)

## Get bytes for plot image
imgData = io.BytesIO()
plt.savefig(imgData, format='PNG', bbox_inches='tight')
imgData.seek(0)
plotBytes = imgData.getvalue()


# Encrypt and save the results (with a key file)
saveFiles(edgeStr, plotBytes)

# Rest the logins file (no users have seen the latest results)
with open('logins.json', 'w') as file:
    logs = {user: None for user in users}
    json.dump(logs, file, indent=2)

# Optionally display results
if not args.silent:
    print(edgeStr)
    plt.show()
