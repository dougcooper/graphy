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

  // observables
  nodes$ = new Subject<Array<Node>>();
  edges$ = new Subject<Array<Edge>>();

  //model
  private _tree: Tree = null;

  //local data store that captures all data entered
  private _data = new Array<number>();
  get data(): Array<number>{return this._data;}

  constructor() { 
    //default tree type
    this._tree = this._factory(TreeType.BST);
  }

  /**
   * Creates a new tree with the requested type and updates the tree 
   * with the previously added data.
   * 
   * @param treeType The type of tree to use for sorting.
   */
  public setType(treeType:TreeType){
    this._tree = this._factory(treeType);
    this._buildTree();
    this.edges$.next(this._tree.getEdges());
    this.nodes$.next(this._tree.getNodes());
  }

  /**
   * Adds data to the existing tree for sorting.
   * 
   * @param data An array of numbers to add to the tree for sorting.
   */
  public addData(data: number[]){
    this._updateLocalStore(data);
    this.rebuild();
  }

  /**
   *  rebuilds the graph and notifies observers
   */
  public rebuild(){
    this._clearModel();
    this._buildTree();
    this._notifyObservers();
  }

  /**
   * Clears the internal data
   */
  public clear(){
    this._clearModel();
    this._clearLocalData();
    this._notifyObservers();
  }

  public _clearLocalData(){
    this._data = [];
  }

  private _clearModel(){
    this._tree.clear();
    this.nodes$.next([]);
    this.edges$.next([]);
  }

  protected _notifyObservers(){
    this.edges$.next(this._tree.getEdges());
    this.nodes$.next(this._tree.getNodes());
  }

  protected _buildTree(){
    this._data.forEach(val => {this._tree.insert(val);});
  }

  protected _updateLocalStore(data:number[]){
    this._data = this._data.concat(data);
  }

  private _factory(type:TreeType): Tree{
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
