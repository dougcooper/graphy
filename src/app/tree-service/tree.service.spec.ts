import { TestBed } from '@angular/core/testing';

import { TreeService } from './tree.service';
import { Edge, Node } from '../models/tree-model/tree';

const node_data = [2,1,3,4];
const edge_data = [[2,1],[2,3],[3,4]];

class TestTreeService extends TreeService{

  public setLocalData(data:number[]){
    this._updateLocalStore(data);
  }
  public getLocalData(){return this.data }
}

describe('TreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers:[TestTreeService]})
  });

  it('should be created', () => {
    const service: TreeService = TestBed.get(TestTreeService);
    expect(service).toBeTruthy();
  });

  it('can update local store', () => {
    const service: TestTreeService = TestBed.get(TestTreeService);
    service.setLocalData([1,2,3]);
    service.setLocalData([4,5,6]);
    var data = service.getLocalData();
    expect(data.length).toEqual(6); 
  });

  it('can add data', () => {
    const service: TreeService = TestBed.get(TestTreeService);
    let e = [];
    let n = [];
    service.edges$.subscribe(edges=>e = edges);
    service.nodes$.subscribe(nodes=>n = nodes);
    service.addData(node_data);
    
    expect(e.length).toEqual(node_data.length-1); 
    expect(n.length).toEqual(node_data.length);
  });

  it('node data is valid', () => {
    const service: TreeService = TestBed.get(TestTreeService);
    let e = [];
    let n = [];
    service.edges$.subscribe(edges=>e = edges);
    service.nodes$.subscribe(nodes=>n = nodes);
    service.addData(node_data);

    let rv = true;
    node_data.forEach(value=>{
      rv = n.find(node=>{return node.data == value;}) != null ? true : false;
    })
    expect(rv).toBeTruthy();
  });

  it('edge data is valid', () => {
    const service: TreeService = TestBed.get(TestTreeService);
    let e = [];
    let n = [];
    service.edges$.subscribe(edges=>e = edges);
    service.nodes$.subscribe(nodes=>n = nodes);
    service.addData(node_data);

    let rv = true;
    edge_data.forEach(value=>{
      rv = e.find(edge=>{return edge.from.data == value[0] && 
                                edge.to.data   == value[1];}) != null ? true : false;
    })
    expect(rv).toBeTruthy();
  });

  it('can clear data', () => {
    const service: TreeService = TestBed.get(TestTreeService);
    let e = [];
    let n = [];
    service.edges$.subscribe(edges=>e = edges);
    service.nodes$.subscribe(nodes=>n = nodes);
    service.addData(node_data);

    service.clear();
    expect(e).toEqual([]);
    expect(n).toEqual([]);   
  });

});
