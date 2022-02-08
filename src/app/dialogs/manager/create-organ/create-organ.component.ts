import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-organ',
  templateUrl: './create-organ.component.html',
  styleUrls: ['./create-organ.component.scss']
})
export class CreateOrganComponent implements OnInit {
  orgaoNameControl:FormControl = new FormControl('', [Validators.required]);
  badgetControl:FormControl = new FormControl('', [Validators.required])
  formGroup:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this. groupForm();
  }

  public onCreateOrgan(){
    alert(this.formGroup.value.orgaoName)
  }

  private groupForm(){
   this.formGroup =  this.fb.group({
      orgaoName : this.orgaoNameControl,
      badget: this.badgetControl
    })
  }

}
