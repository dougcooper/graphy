import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphyFormComponent } from './graphy-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TreeService } from '../tree-service/tree.service';

describe('GraphyFormComponent', () => {
  let component: GraphyFormComponent;
  let fixture: ComponentFixture<GraphyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphyFormComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [TreeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
