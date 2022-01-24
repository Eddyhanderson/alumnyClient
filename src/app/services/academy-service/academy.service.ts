import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AcademyModel } from '../../models/academy-model/academy.model';
import { Routes } from 'src/app/shared/utils/routing-constants';
import { CreationResult } from "src/app/models/creation-result/creation-result";
import { Response } from 'src/app/models/response/response';
import { Observable } from "rxjs";
import { PageResponse } from "src/app/models/page-response/page-response";
import { PaginationQuery } from "src/app/queries/pagination-query/pagination-query";
import { AcademyQuery } from "src/app/queries/academy-query/academy.query";

@Injectable({ providedIn: "root" })
export class AcademyService {
    public constructor(private http: HttpClient) { }



    public getAll(pagination: PaginationQuery): Observable<PageResponse<AcademyModel>> {
        if (pagination == null) return null;

        try {
            var response = this.http.get<PageResponse<AcademyModel>>(Routes.ACADEMY_GET_ALL_ROUTE, {
                params: {
                    'pageNumber': pagination.pageNumber.toString(),
                    'pageSize': pagination.pageSize.toString(),
                    'searchValue': pagination.searchValue
                }
            });

            return response;

        } catch (error) {
            console.log(error.message);
        }
    }



    /**
     * This method make request to server for get academy by unique name
     * @param name the name of academy that are shearching
     * @returns the Observable containing the academy object if exists and null if no
     */
    public async get(query: AcademyQuery): Promise<AcademyModel> {
        if (query == null) return null;

        try {
            var response = await this.http.get<Response<AcademyModel>>(Routes.ACADEMY_GET_ROUTE, {
                params: {
                    'name': query.name,
                    'id': query.id
                }
            }).toPromise();

            return response?.data;            
        } catch (error) {
            console.log(error?.message);
            return null;
        }

        return response.data;
    }


    /**
     * This method make request to server for create academy 
     * @param newAcademy the data related of the user academy
     * @returns the Observable containing the academy object
     */
    create(newAcademy: AcademyModel): Promise<CreationResult<AcademyModel>> {
        try {
            return this.http.post<CreationResult<AcademyModel>>(Routes.ACADEMY_CREATE_ROUTE, newAcademy).toPromise();
        } catch (error) {
            console.log(error.message);
        }
    }
}