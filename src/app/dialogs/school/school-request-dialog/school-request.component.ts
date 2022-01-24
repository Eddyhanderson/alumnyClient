import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-school-request',
  templateUrl: './school-request.component.html',
  styleUrls: ['./school-request.component.scss']
})
export class SchoolRequestComponentDialog implements OnInit {
  
  constructor(public dialogRef:MatDialogRef<SchoolRequestComponentDialog>) { }

  ngOnInit(): void {
  }

  onJoinSchool(event:HTMLButtonElement){
    let node:Node;
            
  }

  onCloseDialog(){
    this.dialogRef.close();
  }
}
