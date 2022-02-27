import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/models/response/response';
import { Observable } from 'rxjs/internal/Observable';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { FormationQuery } from 'src/app/queries/formation-query/formation-query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  constructor(private http:HttpClient) { }

  public async create(formation: FormationModel): Promise<CreationResult<FormationModel>> {
    try {
      return await this.http.post<CreationResult<FormationModel>>(Routes.FORMATION_CREATE_ROUTE, formation,).toPromise();
    } catch (error) {
      console.log(error.message)
    }        
  }
  
  public getAll(query: PaginationQuery, param: FormationQuery): Observable<PageResponse<FormationModel>> {
    
    try {
      return this.http.get<PageResponse<FormationModel>>(Routes.FORMATION_GET_ALL_ROUTE, {
        params: {
          'pageNumber': query.pageNumber.toString(),
          'pageSize': query.pageSize.toString(),
          'searchValue': query.searchValue ?? '',
          ...param
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  public getAllPublished(query: PaginationQuery, param: FormationQuery): Observable<PageResponse<FormationModel>> {
    
    try {
      return this.http.get<PageResponse<FormationModel>>(Routes.FORMATION_GET_ALL_PUBLISHED_ROUTE, {
        params: {
          'pageNumber': query.pageNumber.toString(),
          'pageSize': query.pageSize.toString(),
          'searchValue': query.searchValue ?? '',
          ...param
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  public async get(id: string): Promise<FormationModel> {
    try {
      let response = await this.http.get<Response<FormationModel>>(Routes.FORMATION_GET_ROUTE.replace('{id}', id)).toPromise();
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
