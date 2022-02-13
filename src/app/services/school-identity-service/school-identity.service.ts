import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { SchoolIdentityModel } from 'src/app/models/school-identity-model/school-identity-model';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Injectable({
  providedIn: 'root'
})
export class SchoolIdentityService {

  constructor(private http: HttpClient) { }

  public create(schoolIdentity: SchoolIdentityModel): Promise<CreationResult<SchoolIdentityModel>> {

    if (schoolIdentity == null) return null;

    try {
      return this.http.post<CreationResult<SchoolIdentityModel>>(Routes.SCHOOL_IDENTITY_CREATE_ROUTE, schoolIdentity).toPromise();
    } catch (error) {
      console.log(error.message);
    }
  }
}
