import { TestBed } from '@angular/core/testing';

import { Tree, Node, Edge } from './tree';
import { setupTestingRouter } from '@angular/router/testing';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

class TestTree extends Tree{
  insert(val:any){
  }
  verifyIsLeaf(node:Node):boolean{
    return this._isLeaf(node);
  }
  setRoot(node:Node){
    this.root = node;
  }
  addNode(node:Node){
    this.nodes.push(node);
  }
  addEdge(edge:Edge){
    this.edges.push(edge);
  }
  static setup_tree(tree:TestTree){
    let root = new Node(0,null);
    root.left = new Node(0,root);
    let edge  = new Edge(root,root.left);
    tree.setRoot(root);
    tree.addNode(root);
    tree.addNode(root.left);
    tree.addEdge(edge);
  }

  hasNodes():boolean{
    return (this.nodes.length > 0);
  }

  hasEdges():boolean{
    return this.edges.length > 0;
  }

  hasData(): boolean{
    return (this.root && this.hasNodes() && this.hasEdges());
  }
}

describe('Tree', () => {
  let module: TestTree;
  beforeEach(() => {
    module = new TestTree();
  });

  it('should be created', () => {
    // const module: TestTree = TestBed.get(TestTree);
    expect(module).toBeTruthy();
  });

  it('should have nodes', () => {
    // const module: TestTree = TestBed.get(TestTree);
    TestTree.setup_tree(module);
    expect(module.hasNodes()).toBeTruthy();
  });

  it('should have edges', () => {
    // const module: TestTree = TestBed.get(TestTree);
    TestTree.setup_tree(module);
    expect(module.hasEdges()).toBeTruthy();
  });

  it('should clear data', () => {
    // const module: TestTree = TestBed.get(TestTree);
    TestTree.setup_tree(module);
    expect(module.hasData()).toBeTruthy();
    module.clear();
    expect(module.hasData()).toBeFalsy();
  });

  it('should determine if is leaf', () => {
    // const module: TestTree = TestBed.get(TestTree);
    let baseNode = new Node(0,null);
    expect(module.verifyIsLeaf(baseNode)).toBeTruthy();
    baseNode.left = new Node(0,baseNode);
    expect(module.verifyIsLeaf(baseNode)).toBeFalsy();
    baseNode.right = new Node(0,baseNode);
    expect(module.verifyIsLeaf(baseNode)).toBeFalsy();
    baseNode.left = null;
    expect(module.verifyIsLeaf(baseNode)).toBeFalsy();
    baseNode.right = null;
    expect(module.verifyIsLeaf(baseNode)).toBeTruthy();
  });

});
