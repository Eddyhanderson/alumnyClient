import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { ArticleLessonCreationComponent } from 'src/app/dialogs/lesson/article/create/article-lesson-creation.component';
import { VideoLessonCreationComponent } from 'src/app/dialogs/lesson/video/create/video-lesson-creation.component';
import { UserModel } from 'src/app/models/user-model/user-model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input('user') user: UserModel;
  @Input('role') role: string;
  @Input('sidenav') sidenav: MatSidenav;


  search: string;
  constructor(private matDialog: MatDialog, private router: Router) { }

  ngOnInit(): void {

  }

  public gotoSearch(key: string) {
    if (key != null) {
      this.router.navigate(['./search'], {
        queryParams: {
          'key': this.search
        },        
      })
    }
  }

  public openCreateVideoLessonDialog() {
    this.matDialog.open(VideoLessonCreationComponent, {
      width: '80%',
      height: '80%'
    })
  }

  public openCreateArticleLessonDialog() {
    this.matDialog.open(ArticleLessonCreationComponent, {
      width: '70%',
      height: '80%'
    })
  }

}
