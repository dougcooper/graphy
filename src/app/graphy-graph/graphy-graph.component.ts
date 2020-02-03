import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TreeService } from '../tree-service/tree.service';

type GraphNode = {id:string,label:string};
type GraphEdge = {id:string,source:string,target:string,label:string};
type GraphNodeArray = Array<GraphNode>;
type GraphEdgeArray = Array<GraphEdge>;

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

  constructor(private treeService:TreeService) { 
    //TODO: handle duplicates
    treeService.nodes$.subscribe(nodes=>{
      this._nodes = nodes.map(node=>{
        let n = {
          id: node.data.toString(),
          label: node.data.toString()
        };
        return n;
      })
    })
    //TODO: handle duplicates
    treeService.edges$.subscribe(edges=>{
      this._edges = edges.map(edge=>{
        let e = {
          id: "from"+edge.from.data.toString() +"to"+edge.to.data.toString(),
          source: edge.from.data.toString(),
          target: edge.to.data.toString(),
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
    this.zoomToFit();
  }

  zoomToFit(){
    this.zoomToFit$.next(true);
    this.center$.next(true);
  }

  clearPlot(){
    this.treeService.clear();
  }

}
