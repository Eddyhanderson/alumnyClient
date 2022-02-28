import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreationResult } from "src/app/models/creation-result/creation-result";
import { OrganModel } from "src/app/models/organ-model/organ-model";
import { PageResponse } from "src/app/models/page-response/page-response";
import { OrganQuery } from "src/app/queries/organ-query/organ-query";
import { PaginationQuery } from "src/app/queries/pagination-query/pagination-query";
import { Routes } from "src/app/shared/utils/routing-constants";
import { Response } from 'src/app/models/response/response';

@Injectable({
    providedIn: 'root'
})
export class OrganService {

    constructor(private http: HttpClient) { }

    /**
    * Create a given organ
    * @param organ the organ data to be created
    */
    public create(organ: OrganModel): Promise<CreationResult<OrganModel>> {

        if (organ == null) return null;

        try {
            return this.http.post<CreationResult<OrganModel>>(Routes.ORGAN_CREATE_ROUTE, organ).toPromise();
        } catch (error) {
            console.log(error.message);
        }
    }

    public getAll(query: PaginationQuery, param: OrganQuery): Observable<PageResponse<OrganModel>> {
        try {
            return this.http.get<PageResponse<OrganModel>>(Routes.ORGAN_GET_ALL_ROUTE, {
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

    public async get(id: string): Promise<OrganModel> {
        try {
          let response = await this.http.get<Response<OrganModel>>(Routes.ORGAN_GET_ROUTE.replace('{id}', id)).toPromise();
          return response.data;
        } catch (error) {
          console.log(error.message);
        }
      }

}