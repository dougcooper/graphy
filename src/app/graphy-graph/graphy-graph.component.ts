import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TreeService } from '../tree-service/tree.service';

// export type GraphNode = {id:string,label:{data:string,count:string}};
// export type GraphEdge = {id:string,source:string,target:string,label:string};
// export type GraphNodeArray = Array<GraphNode>;
// export type GraphEdgeArray = Array<GraphEdge>;

export class GraphNode {id:string;label:{data:string,count:string}};
export class GraphNodeArray extends Array<GraphNode>{};
export class GraphEdge {id:string;source:string;target:string;label:string;};
export class GraphEdgeArray extends Array<GraphEdge>{};

@Component({
  selector: 'app-graphy-graph',
  templateUrl: './graphy-graph.component.html',
  styleUrls: ['./graphy-graph.component.css']
})

export class GraphyGraphComponent implements OnInit{
  
  _edges: GraphEdgeArray = [];
  _nodes: GraphNodeArray = [];

  public layoutSettings = {
    orientation: "TB"
  }

  get edges(): GraphEdgeArray{return this._edges;}
  get nodes(): GraphNodeArray{return this._nodes;}

  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  autoZoom: boolean = true;
  autoCenter: boolean = true;

  constructor(public treeService:TreeService) { 
    treeService.nodes$.subscribe(nodes=>{
      this._nodes = nodes.map(node=>{
        let n = {
          id: node.id.toString(),
          label: {
            data: node.data.toString(), 
            count: node.count.toString()
          }
        };
        return n;
      })
    })
    treeService.edges$.subscribe(edges=>{
      this._edges = edges.map(edge=>{
        let e = {
          id: "from"+edge.from.id.toString() +"to"+edge.to.id.toString(),
          source: edge.from.id.toString(),
          target: edge.to.id.toString(),
          label: ""
        }
        return e;
      })
    })
  }

  addData(data:number[]){
    this.treeService.addData(data);
  }

  ngOnInit() {
    // this.zoomToFit();
  }

  zoomToFit(){
    this.zoomToFit$.next(true);
    this.center$.next(true);
  }

  clearPlot(){
    this.treeService.clear();
  }

  reset(){
    this.treeService.rebuild();
  }

}
