import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/modules/material/material.module';
import { SchoolRequestComponentDialog } from './school/school-request-dialog/school-request.component';
import { MatDialog, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseCreateDialogComponent } from './course/course-create-dialog/course-create-dialog.component';
import { TeacherPlaceCreateDialog } from './teacher-place/teacher-place-create-dialog/teacher-place-create.dialog';
import { VideoLessonCreationComponent } from './lesson/video/create/video-lesson-creation.component';
import { SharedModule } from '../shared/shared.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ArticleLessonCreationComponent } from './lesson/article/create/article-lesson-creation.component';
import { ArticleLessonViewComponent } from './lesson/article/view/article-lesson-view.component';
import { VideoLessonViewComponent } from './lesson/video/view/video-lesson-view.component';
import { StudantRegistrationComponent } from './teacher-place-studants/studant-registration/studant-registration.component';
import { CreateOrganDialogComponent } from './organ/create-organ/create-organ.component';
import { CreateFormationDialogComponent } from './formation/create-formation-dialog/create-formation-dialog.component';
import { CreateSchoolDialogComponent } from './school/create-school-dialog/create-school-dialog.component';
import { CreateModulesDialogComponent } from './modules/create-modules-dialog/create-modules-dialog.component';
import { CreateFormationEventComponent } from './formation-event/create-formation-event/create-formation-event.component';
import { CreateFormationRequestDialogComponent } from './formation-request/create-formation-request-dialog/create-formation-request-dialog.component';


@NgModule({
  declarations: [
    SchoolRequestComponentDialog,
    CourseCreateDialogComponent,
    TeacherPlaceCreateDialog,
    VideoLessonCreationComponent,
    ArticleLessonCreationComponent,
    ArticleLessonViewComponent,
    VideoLessonViewComponent,
    StudantRegistrationComponent,
    CreateOrganDialogComponent,
    CreateSchoolDialogComponent,
    CreateFormationDialogComponent,
    CreateModulesDialogComponent,
    CreateModulesDialogComponent,
    CreateFormationEventComponent,
    CreateFormationRequestDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    SchoolRequestComponentDialog,
    CourseCreateDialogComponent,
    TeacherPlaceCreateDialog,
    VideoLessonCreationComponent,
    ArticleLessonCreationComponent,
    ArticleLessonViewComponent,
    VideoLessonViewComponent,
    StudantRegistrationComponent,
    CreateOrganDialogComponent,
    CreateSchoolDialogComponent,
    CreateFormationDialogComponent,
    CreateModulesDialogComponent,
    CreateFormationEventComponent
  ],

  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true, disableClose: true }
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
})
export class DialogsModule { }
