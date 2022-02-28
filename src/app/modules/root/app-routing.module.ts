import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: "auth", loadChildren: () => import('../../modules/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: "home", loadChildren: () => import('../../modules/home/home.module').then(m => m.HomeModule) },
  { path: "manager", loadChildren: () => import('../../modules/manager/manager.module').then(m => m.ManagerModule) },
  { path: "studant", loadChildren: () => import('../../modules/studant/studant.module').then(m => m.StudantModule) },
  { path: "school", loadChildren: () => import('../../modules/school/school.module').then(m => m.SchoolModule) },
  { path: "formations", loadChildren: () => import('../../modules/formation/formation.module').then(m => m.FormationModule) },
  { path: "formations-requests", loadChildren: () => import('../../modules/formation-request/formation-request.module').then(m => m.FormationRequestModule) },
  { path: "module", loadChildren: () => import('../../modules/module/module.module').then(m => m.ModuleModule) },
  { path: "lesson", loadChildren: () => import('../../modules/lesson/lesson.module').then(m => m.LessonModule) },
  { path: "search", component: SearchComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

