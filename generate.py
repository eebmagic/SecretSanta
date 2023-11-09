import numpy as np
import random
import json

import networkx as nx
import matplotlib.pyplot as plt

import io


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


with open('names.json') as file:
    names = json.load(file)
print(f"There are: {len(names)} names")

G, edges = genGraph(names)
edgeStr = json.dumps(edges, indent=2)
print(edgeStr)


pos = nx.planar_layout(G)
nx.draw(G, pos, with_labels=True)
plt.show()

# Optionally get bytes for plot image
imgData = io.BytesIO()
plt.savefig(img_data, format='PNG', bbox_inches='tight')
plt.close()
imgData.seek(0)
plotBytes = imgData.getvalue()

