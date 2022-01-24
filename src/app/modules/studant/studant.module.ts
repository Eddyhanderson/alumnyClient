import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudantProfileComponent } from './studant-profile/studant-profile.component';
import { StudantRoutingModule } from './studant-routing.module';
import { MaterialModule } from '../material/material.module';
import { StudantProfileQuestionsComponent } from './studant-profile-questions/studant-profile-questions.component';
import { StudantProfileTeacherPlacesComponent } from './studant-profile-teacher-places/studant-profile-teacher-places.component';
import { StudantProfileClassematesComponent } from './studant-profile-classemates/studant-profile-classemates.component';
import { TeacherPlacesComponent } from './teacher-places/teacher-places.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionsExposedComponent } from './questions/questions-exposed/questions-exposed.component';
import { QuestionsForMeComponent } from './questions/questions-for-me/questions-for-me.component';

@NgModule({
  declarations: [StudantProfileComponent, StudantProfileQuestionsComponent, StudantProfileTeacherPlacesComponent, StudantProfileClassematesComponent, TeacherPlacesComponent, QuestionsExposedComponent, QuestionsForMeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StudantRoutingModule,
    SharedModule
  ]
})
export class StudantModule { }
