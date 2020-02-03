import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphyGraphComponent } from './graphy-graph.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TreeService } from '../tree-service/tree.service';

const node_data = [2,1,3,4];
const edges = [
    {
      id: '2,1',
      source: '2',
      target: '1',
      label: '2,1'
    }, {
      id: '2,3',
      source: '2',
      target: '3',
      label: '2,3'
    }, {
      id: '3,4',
      source: '3',
      target: '4',
      label: '3,4'
    }
  ];

const nodes = [
  {
    id: '1',
    label: '1'
  }, {
    id: '2',
    label: '2'
  }, {
    id: '3',
    label: '3'
  }, {
    id: '4',
    label: '3'
  }
];

describe('GraphyGraphComponent', () => {
  let component: GraphyGraphComponent;
  let fixture: ComponentFixture<GraphyGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphyGraphComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [TreeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('nodes are correct', () => {
    component.addData(node_data);
    let rv = true;
    component.nodes.forEach(component_node=>{
      rv = nodes.find((local_node,index)=>{
        return local_node.id == component_node.id;
      }) ? true : false;
    });
    expect(rv).toBeTruthy();
  });

  it('edges are correct', () => {
    component.addData(node_data);
    let rv = true;
    component.edges.forEach(component_edge=>{
      rv = edges.find((local_edge,index)=>{
        return (local_edge.id == component_edge.id) &&
                (local_edge.source == component_edge.source) &&
                (local_edge.target == component_edge.target);
      }) ? true : false;
    });
    expect(rv).toBeTruthy();
  });
});
