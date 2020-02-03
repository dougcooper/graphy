import { Tree,Node,Edge } from '../tree-model/tree';
import { TYPED_NULL_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { isNull } from 'util';

export class BinarySortedTree extends Tree {

  constructor() { super()}

  public insert(val:number){
    let n = this._insert(this.root,val);
    this.nodes.push(n);
    if(n.parent != null)
      this.edges.push(new Edge(n.parent,n));
  }

  private _insert(node:Node, val:number) :Node{
    let n:Node;
    if(node == null){
      this.root = new Node(val,null);
      n = this.root;
    }
    else
    {
      if(val < node.data)
      {
        if(node.left == null){
          node.left = new Node(val,node);
          n = node.left;
        }
        else
          n = this._insert(node.left,val);
      }
      else
      {
        if(node.right == null){
          node.right = new Node(val,node);
          n = node.right;
        }
        else
          n = this._insert(node.right,val);
      }      
    }
    return n;    
  }
}
