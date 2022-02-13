import { Injectable } from '@angular/core';

import { Routes } from '../../shared/utils/routing-constants';

import { UserModel } from '../../models/user-model/user-model';
import { AuthResult } from '../../models/auth-result/auth-result';

import { BehaviorSubject, Observable, Subject, } from 'rxjs';
import { Response } from '../../models/response/response';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { StudantModel } from 'src/app/models/studant-model/studant.model';

export interface LoginRequest {
  email: string;
  password?: string;
  refreshToken?: string;
  token?: string;
  loginProvider: string;
  loginKey: string;
  grantType: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }
  private loginReq: LoginRequest;

  private loginStatus = new BehaviorSubject<boolean>(this.checkLogStatus());

  /**
   * To register the new user
   * @param newUser the user that we are trying register
   */
  public async registration(newUser: UserModel): Promise<AuthResult> {
    if (newUser == null) return null;

    try {
      let authResult = await this.http.post<AuthResult>(Routes.USER_REGISTER_ROUTE, newUser).toPromise();

      if (authResult?.authenticated) {
        this.persistAuthData(authResult);
        this.persistUserData(authResult.user);
        this.loginStatus.next(true);
      }



      return authResult;
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * 
   * @param email to store the data about the user email
   * @param password to store the data about the user password
   */
  public async login(email: string, password: string): Promise<AuthResult> {

    this.loginReq = {
      email: email,
      password: password,
      loginProvider: "alumni",
      loginKey: "email",
      grantType: 'Password',
    }

    try {
      var authResult = await this.http
        .post<AuthResult>(Routes.USER_LOGIN_ROUTE, this.loginReq).toPromise();

      if (authResult.authenticated) {
        this.persistAuthData(authResult);
        this.persistUserData(authResult.user);
        this.loginStatus.next(true);
      }

      return authResult;

    } catch (error) {
      console.log(error.message);
    }
  }

  public async getStudant(userId: string): Promise<StudantModel> {
    try {
      var response = await this.http.get<Response<StudantModel>>(Routes.USER_GET_STUDANT_ROUTE.replace("{id}", userId)).toPromise();

      return response?.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * To do logout on the application
   */
  logout() {

    this.removeAuthDataPersisted();
    this.router.navigateByUrl('/auth/login');
  }

  /**
   * To check if the user are log in
   */
  private checkLogStatus(): boolean {
    if (localStorage.getItem('logStatus') === "1")
      return true;
    return false;
  }

  /**
   * Set the user who are loged in
   */
  private persistUserData(user: UserModel): boolean {
    if (localStorage['logStatus'] === "1") {
      localStorage.user = JSON.stringify(user);
      return true;
    }
    return false;
  }

  /**
   * Set the values on local storage when user is log in
   * @param result the authentication configuration response to the request
   */
  private persistAuthData(authResult: AuthResult) {
    localStorage.setItem('token', authResult.authConfigTokens.tokenValue);
    localStorage.setItem('refreshToken', authResult.authConfigTokens.refreshToken);
    localStorage.setItem('userId', authResult.user.id);
    localStorage.setItem('userRole', authResult.user.role);
    localStorage.setItem('logStatus', '1');
  }

  /**
   * Remove the values on local storage when user is log out 
   */
  private removeAuthDataPersisted() {
    localStorage.clear()
  }

  // Observable that store the values of user login status
  get logStatus() { return this.loginStatus.asObservable() }
}
