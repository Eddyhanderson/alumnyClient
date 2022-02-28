import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreationResult } from "src/app/models/creation-result/creation-result";
import { FormationRequestModel } from "src/app/models/formation-request-model/formation-request.model";
import { FormationRequestQuery } from "src/app/queries/formation-request-query/formation-request-query";
import { PaginationQuery } from "src/app/queries/pagination-query/pagination-query";
import { Routes } from "src/app/shared/utils/routing-constants";
import { Observable } from 'rxjs/internal/Observable';
import { PageResponse } from 'src/app/models/page-response/page-response';
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

  public getAll(query: PaginationQuery, param: FormationRequestQuery): Observable<PageResponse<FormationRequestModel>> {

    try {
      return this.http.get<PageResponse<FormationRequestModel>>(Routes.FORMATION_REQUEST_GET_ALL_ROUTE, {
        params: {
          'pageNumber': query.pageNumber.toString(),
          'pageSize': query.pageSize.toString(),
          'searchValue': query.searchValue ?? '',
          ...param
        }
      });
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

  public async aprove(id: string, request: FormationRequestModel): Promise<FormationRequestModel> {
    try {
      let response = await this.http
        .post<Response<FormationRequestModel>>(Routes.FORMATION_REQUEST_APROVE_ROUTE
          .replace('{id}', id), request).toPromise();
      return response?.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  public async pay(id: string, request: FormationRequestModel): Promise<FormationRequestModel> {
    try {
      let response = await this.http
        .post<Response<FormationRequestModel>>(Routes.FORMATION_REQUEST_PAY_ROUTE
          .replace('{id}', id), request).toPromise();
      return response?.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  public async confirm(id: string, request: FormationRequestModel): Promise<FormationRequestModel> {
    try {
      let response = await this.http
        .post<Response<FormationRequestModel>>(Routes.FORMATION_REQUEST_CONFIRM_ROUTE
          .replace('{id}', id), request).toPromise();
      return response?.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}

