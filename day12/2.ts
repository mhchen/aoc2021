import { parseInput } from '../utils';

const lines = parseInput();

interface Node {
  label: string;
  edges: string[];
}

const nodeMap: Record<string, Node> = {};

for (const line of lines) {
  const [src, dest] = line.split('-');

  if (!nodeMap[src]) {
    nodeMap[src] = {
      label: src,
      edges: [],
    };
  }
  if (!nodeMap[dest]) {
    nodeMap[dest] = {
      label: dest,
      edges: [],
    };
  }

  nodeMap[src].edges.push(dest);
  nodeMap[dest].edges.push(src);
}

function traverse(
  node: Node,
  path: string[] = [],
  hasDoubleVisited = false,
): string[][] {
  const currentPath = [...path, node.label];
  if (node.label === 'end') {
    return [currentPath];
  }
  const potentialPaths: string[][] = [];
  for (const edge of node.edges) {
    if (edge === 'start') {
      continue;
    }
    if (/^[a-z]+$/.exec(edge) && path.includes(edge)) {
      if (hasDoubleVisited) {
        continue;
      }

      potentialPaths.push(...traverse(nodeMap[edge], currentPath, true));
      continue;
    }

    potentialPaths.push(
      ...traverse(nodeMap[edge], currentPath, hasDoubleVisited),
    );
  }

  return potentialPaths;
}

console.log(traverse(nodeMap.start).length);
