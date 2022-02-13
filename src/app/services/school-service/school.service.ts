import { HttpClient, HttpClientModule, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Response } from '../../models/response/response';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { Routes } from 'src/app/shared/utils/routing-constants';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { CourseModel } from 'src/app/models/course-model/course.model';
import { map } from 'rxjs/operators';
import { PaginationQuery } from "src/app/queries/pagination-query/pagination-query";
import { SchoolQuery } from "src/app/queries/school-query/school.query";
import { CreationResult } from "src/app/models/creation-result/creation-result";

@Injectable({
    providedIn: "root"
})
export class SchoolService {

    constructor(private http: HttpClient) { }

    /**
     * Allow registration of the certain school
     * @param school the data that will be persisted about the school
     */
     public create(school: SchoolModel): Promise<CreationResult<SchoolModel>> {

        if (school == null) return null;
    
        try {
          return this.http.post<CreationResult<SchoolModel>>(Routes.SCHOOL_CREATE_ROUTE, school).toPromise();
        } catch (error) {
          console.log(error.message);
        }
      }

    /**
     * Get all the schools in the database
     * @param query the data with specification of page number and size
     */
    public getAll(query: PaginationQuery, param?: SchoolQuery): Observable<PageResponse<SchoolModel>> {
        let queryParams = this.createQueryParams(query, param);

        try {
            return this.http.get<PageResponse<SchoolModel>>(Routes.SCHOOL_GET_ALL_ROUTE, {
                params: queryParams
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    /**
     * Get all schools 
     * @param query the data with specification of page number and size
     */
    public async get(id: string): Promise<SchoolModel> {
        try {
            var response = await this.http.get<Response<SchoolModel>>(Routes.SCHOOL_GET_ROUTE.replace('{id}', id)).toPromise();

            return response.data;
        } catch (error) {
            console.log("ERROR LOG:", error.message);
        }
    }

    private createQueryParams(query: PaginationQuery, params: SchoolQuery): HttpParams {
        return new HttpParams()
            .set('pageNumber', query.pageNumber.toString() ?? '')
            .set('pageSize', query.pageSize.toString() ?? '')
            .set('searchValue', query.searchValue ?? '')
            .set('teacherId', params?.teacherId ?? '')
            .set('subscribed', params?.subscribed ? 'true' : 'false');
    }

    public async getSchoolByUser(userId: string): Promise<SchoolModel> {
        try {
          var response = await this.http.get<Response<SchoolModel>>(Routes.USER_GET_BY_USER_ROUTE.replace("{userId}", userId))
          .toPromise();
    
          return response?.data;
        } catch (error) {
          console.log(error.message);
        }
      }

    /**
     * To persist in local storage the information about teacher by user id
     * @param userId the user of the teacher
     */
    public async setSchoolData(userId: string): Promise<boolean> {

        if (localStorage.school !== undefined) return true;

        try {
            let school = await this.getSchoolByUser(userId);

            if (school) {
                this.persistSchoolData(school);
                return true;
            }

            return false;
        } catch (error) {
            console.log(error.message)
        }
    }

    private persistSchoolData(school: SchoolModel) {
        localStorage.school = JSON.stringify(school);
    }

} 