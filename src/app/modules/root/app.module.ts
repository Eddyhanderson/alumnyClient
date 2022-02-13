import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from '../material/material.module';
import { AccountService } from "../../services/account-service/account.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from '../../interceptors/authentication/authentication.interceptor';
import { AcademyService } from '../../services/academy-service/academy.service';
import { SharedModule } from '../../shared/shared.module';
import { SchoolService } from '../../services/school-service-3/school.service';
import { ManagerService } from '../../services/manager-service/manager.service';
import { DialogsModule } from '../../dialogs/dialogs.module';
import { CommonModule } from '@angular/common';
import { AppBuildComponent } from './app-build/app-build.component';
import { SearchComponent } from './search/search.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AppBuildComponent,
    SearchComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,    
    SharedModule,
    DialogsModule,
    FormsModule
  ],  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    AccountService,
    SchoolService,
    SchoolService,
    ManagerService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
