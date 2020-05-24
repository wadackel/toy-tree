import chalk from 'chalk';
import { TreeNode, DirectoryNode } from './types';

const displayName = (node: TreeNode) => {
  switch (node.type) {
    case 'file':
      return node.name;
    case 'directory':
      return chalk.cyan(node.name);
  }
};

const formatEach = (nodes: TreeNode[], prefix: string) => {
  let result = '';

  nodes.forEach((node, index) => {
    const edge = index === nodes.length - 1;
    const guide = prefix + (edge ? '`--' : '|--');
    const next = prefix + (edge ? '  ' : '|  ');

    result += `${guide} ${displayName(node)}\n`;

    if (node.type === 'directory') {
      result += formatEach(node.children, next);
    }
  });

  return result;
};

export const format = (node: DirectoryNode) => {
  return `${node.name}\n${formatEach(node.children, '')}`;
};
