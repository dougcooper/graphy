import { Injectable } from '@angular/core';
import { Tree,Node,Edge } from '../models/tree-model/tree';
import { BinarySortedTree } from '../models/binary-sorted-tree-model/binary-sorted-tree';
import { Subject } from 'rxjs';

Injectable({
  providedIn: 'root'
})

//TODO: handle storage of data and tree type
//TODO: add option to select storage. when tree is constructed or when setData called?
enum StorageOptions{ COOKIE };

export enum TreeType {BST};

export class TreeService{

  //model
  tree: Tree = null;

  //global user provided data for persistent storage
  data: Array<number> = [];

  // observables
  nodes$ = new Subject<Array<Node>>();
  edges$ = new Subject<Array<Edge>>();

  constructor() { 
    //default tree type
    this.tree = this.factory(TreeType.BST);
  }

  /**
   * Creates a new tree with the requested type and updates the tree 
   * with the previously added data.
   * 
   * @param type
   */
  public setType(type:TreeType){
    this.tree = this.factory(type);
    this.data.forEach(val => this.tree.insert(val));
    this.edges$.next(this.tree.getEdges());
    this.nodes$.next(this.tree.getNodes());
  }

  public addData(data: number[]){
    
    data.forEach(val => {
      //TODO: handle duplicates
      this.tree.insert(val);
      this.data.push(val);
    });
    this.edges$.next(this.tree.getEdges());
    this.nodes$.next(this.tree.getNodes());
  }

  public clear(){
    this.tree.clear();
    this.data = [];
    this.nodes$.next([]);
    this.edges$.next([]);
  }

  private factory(type:TreeType): Tree{
    let t = null;
    switch(type){
      case TreeType.BST:
        t = new BinarySortedTree();
        break;
      default:
        t = new BinarySortedTree();
    }
    return t;
  }
}
