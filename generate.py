import numpy as np
import random
import json

import networkx as nx
import matplotlib.pyplot as plt

import io

from encrypt import saveFiles


def genGraph(N):
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
        validShuffle = not any([name == available[i] for i, name in enumerate(original)])


    # Add edges to graph
    edges = {name: available[i] for i, name in enumerate(original)}
    for a, b in edges.items():
        G.add_edge(a, b)

    return G, edges


# Load the names
with open('names.json') as file:
    names = json.load(file)
print(f"There are: {len(names)} names")


# Make the graph
G, edges = genGraph(names)
edgeStr = json.dumps(edges, indent=2)

# Make the plot image
pos = nx.planar_layout(G)
nx.draw(G, pos, with_labels=True)

## Get bytes for plot image
imgData = io.BytesIO()
plt.savefig(imgData, format='PNG', bbox_inches='tight')
imgData.seek(0)
plotBytes = imgData.getvalue()


# Encrypt and save the results (with a key file)
saveFiles(edgeStr, plotBytes)


print(edgeStr)
plt.show()

