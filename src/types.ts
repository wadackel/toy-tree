/**
 * Utilities
 */
export type TODO_any = any;

/**
 * Node
 */
interface BaseNode<T> {
  type: T;
  name: string;
}

export interface FileNode extends BaseNode<'file'> {}

export interface DirectoryNode extends BaseNode<'directory'> {
  children: TreeNode[];
}

export type TreeNode = FileNode | DirectoryNode;

/**
 * Options
 */
export interface Options {
  level: number;
}
