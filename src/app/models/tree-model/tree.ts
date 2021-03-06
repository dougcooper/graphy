export class Node {
  left: Node = null;
  right: Node = null;
  count: number = 0;
  static count: number = 0;
  id: number = null;
  constructor(public data:number,public parent:Node){
    this.id = Node.count++;
  }
}

export class Edge {
  constructor(public from:Node,public to:Node){}
}

export abstract class Tree {
  root: Node = null;
  nodes: Node[] = [];
  edges: Edge[] = [];
  
  public abstract insert(val:any);

  public getEdges():Edge[]{
    return this.edges;
  }

  public getNodes(): Node[]{
    return this.nodes;
  }

  public clear(){
    this.root = null;
    this.nodes = [];
    this.edges = [];
  }

  protected _isLeaf(node:Node):boolean{
    return node.left == null && node.right == null;
  }
}