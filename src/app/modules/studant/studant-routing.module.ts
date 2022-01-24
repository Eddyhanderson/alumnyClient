import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { StudantProfileComponent } from './studant-profile/studant-profile.component'
import { StudantProfileQuestionsComponent } from './studant-profile-questions/studant-profile-questions.component';
import { StudantProfileClassematesComponent } from './studant-profile-classemates/studant-profile-classemates.component';
import { TeacherPlacesComponent } from './teacher-places/teacher-places.component';
import { QuestionsExposedComponent } from './questions/questions-exposed/questions-exposed.component';
import { QuestionsForMeComponent } from './questions/questions-for-me/questions-for-me.component';


var routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'path' },
    {
        path: 'profile', component: StudantProfileComponent, children: [
            { path: 'questions', component: StudantProfileQuestionsComponent },
            { path: 'teacher-places', component: StudantProfileClassematesComponent },
            { path: 'class-mates', component: StudantProfileClassematesComponent }
        ]
    },
    { path: 'teacher-places', component: TeacherPlacesComponent },
    { path: 'questions/exposed', component: QuestionsExposedComponent },
    { path: 'questions/for-me', component: QuestionsForMeComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudantRoutingModule { }