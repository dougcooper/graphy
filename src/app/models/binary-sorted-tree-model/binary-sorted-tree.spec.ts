import { TestBed } from '@angular/core/testing';
import { BinarySortedTree } from './binary-sorted-tree';
import { Node } from '../tree-model/tree'

const node_data = [2,1,3,4];
const edge_data = [[2,1],[2,3],[3,4]];

function check(node:Node, val:number,compare:any):boolean
{
    let rv = true;
    if(node){
        if(!compare(node.data,val))
            rv = false;
         else if (!check(node.left,val,compare) || !check(node.right,val,compare))
            rv = false;
    }

    return rv;
}


function checkBST(root:Node):boolean
{
  let rv = true;

  if(root){

    if(root.left && 
      !check(root.left,root.data,(a:number,b:number)=>{return a < b;}) || 
      !checkBST(root.left))
      rv = false;


    if(root.right && 
      !check(root.right,root.data,(a:number,b:number)=>{return a > b;}) || 
      !checkBST(root.right))
      rv = false;
  }

  return rv;
}

fdescribe('BinarySortedTree', () => {
  let module: BinarySortedTree;

  beforeEach(() => {
    module = new BinarySortedTree();
  });

  it('should be created', () => {
    expect(module).toBeTruthy();
  });

  it('should have correct number of nodes', () => {
    node_data.forEach(val => module.insert(val));
    let nodes = module.getNodes();
    expect(nodes.length).toEqual(4);
    

  });
  it('should have correct number of edges', () => {
    node_data.forEach(val => module.insert(val));
    let edges = module.getEdges();
    expect(edges.length).toEqual(3);
  });

  it('node data is valid', () => {
    node_data.forEach(val => module.insert(val));
    let rv = true;
    node_data.forEach(value=>{
      rv = module.nodes.find(node=>{return node.data == value;}) != null ? true : false;
    })
    expect(rv).toBeTruthy();
  });

  it('edge data is valid', () => {
    
    node_data.forEach(val => module.insert(val));
    let rv = true;
    edge_data.forEach(value=>{
      rv = module.edges.find(edge=>{return edge.from.data == value[0] && 
                                    edge.to.data == value[1];}) != null ? true : false;
    })
    expect(rv).toBeTruthy();
  });

  it('is a binary tree',()=>{
    node_data.forEach(val => module.insert(val));
    expect(checkBST(module.root)).toBeTruthy();
  })
});
