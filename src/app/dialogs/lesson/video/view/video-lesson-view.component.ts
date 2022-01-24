import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-video-lesson-view',
  templateUrl: './video-lesson-view.component.html',
  styleUrls: ['./video-lesson-view.component.scss']
})
export class VideoLessonViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public url: string) { }
  
  ngOnInit(): void {
    if(this.url == null) throw new Error("Url is required")
  }

}
