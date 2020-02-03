import { Component, OnInit, NgModule } from '@angular/core';
import { TreeService, TreeType } from '../tree-service/tree.service';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';

function isAnInteger(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let tmp = control.value as string;    
    let data = tmp.split(',');
    //filter empty
    data.forEach((val,index)=>{
      if(val=="")
        data.splice(index,1);
    })
    //is not a number
    let rv = false;
    data.forEach(element => {
      if(isNaN(Number(element)))
        rv = true;
    });
    return rv ? {notAnInteger: {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-graphy-form',
  templateUrl: './graphy-form.component.html',
  styleUrls: ['./graphy-form.component.css']
})

export class GraphyFormComponent implements OnInit {
  profileForm = new FormGroup({
    'csvDataModel': new FormControl('',[
      Validators.required,
      isAnInteger()])
  })
  constructor(private treeService: TreeService) { 
    treeService.setType(TreeType.BST);
  }

  ngOnInit() {
  }

  add(){
    this.treeService.addData(this.profileForm.get('csvDataModel').value.split(',').map(val=>parseInt(val)));
    this.profileForm.setValue({csvDataModel: ''});
  }

  clear(){
    this.treeService.clear();
    this.profileForm.setValue({csvDataModel: ''});
  }

}
