import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { FormationRequestModel } from 'src/app/models/formation-request-model/formation-request.model';
import { Routes } from 'src/app/shared/utils/routing-constants';
import { Response } from 'src/app/models/response/response';


@Injectable({
  providedIn: 'root'
})
export class FormationRequestService {

  constructor(private http: HttpClient) { }

  public async create(request: FormationRequestModel): Promise<CreationResult<FormationRequestModel>> {
    try {
      return await this.http.post<CreationResult<FormationRequestModel>>(Routes.FORMATION_REQUEST_CREATE_ROUTE, request,).toPromise();
    } catch (error) {
      console.log(error.message)
    }
  }

  public async get(studantId: string, formationId: string): Promise<FormationRequestModel> {
    try {
      let response = await this.http
        .get<Response<FormationRequestModel>>(Routes.FORMATION_REQUEST_GET_ROUTE
          .replace('{studantId}', studantId)
          .replace('{formationId}', formationId)).toPromise();
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
