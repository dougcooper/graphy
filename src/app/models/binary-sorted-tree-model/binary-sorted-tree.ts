import { Tree,Node,Edge } from '../tree-model/tree';
import { TYPED_NULL_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { isNull } from 'util';

export class BinarySortedTree extends Tree {

  constructor() { super()}

  public nodeExists(val:number):number{
    var rv = -1;

    this.nodes.forEach((node,index)=>{
      if(node.data == val){
        rv = index;
        return;
      }
    })
    return rv;
  }

  /**
   * Increments count of existing node or inserts otherwise.
   * @param nodeVal 
   */
  public insert(nodeVal:number){
    var index = this.nodeExists(nodeVal);
    if(index>=0){
      this.nodes[index].count++;
    }
    else{
      let n = this._insert(this.root,nodeVal);
      this.nodes.push(n);
      if(n.parent != null)
        this.edges.push(new Edge(n.parent,n));
      }
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
