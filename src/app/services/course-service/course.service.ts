import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Routes } from 'src/app/shared/utils/routing-constants';
import { CourseModel } from 'src/app/models/course-model/course.model';
import { Observable } from 'rxjs';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { map } from 'rxjs/operators';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { Response } from 'src/app/models/response/response';
import { CourseQuery } from "src/app/queries/course-query/course.query";
import { PaginationQuery } from "src/app/queries/pagination-query/pagination-query";

@Injectable({ providedIn: "root" })
export class CourseService {
    public constructor(private http: HttpClient) { }

    /**
     * This method make request to server for get course by unique name
     * @param name the name of course that are searching
     * @returns the response containing the course object if exists and null if no
     */
    public async get(query: CourseQuery): Promise<CourseModel> {
        try {

            if (query == null) return null;

            var response = await this.http.get<Response<CourseModel>>(Routes.COURSE_GET_BY_NAME_ROUTE, {
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
    }

    /**
     * This method make request to server for create course 
     * @param newCourse the data related of the user course
     * @returns the response containing the course object
     */
    create(newCourse: CourseModel): Promise<CreationResult<CourseModel>> {
        try {
            return this.http.post<CreationResult<CourseModel>>(Routes.COURSE_CREATE_ROUTE, newCourse).toPromise();
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * Get all courses of school
     * @param query the data with specification of page number and size
     */
    public getAll(query: PaginationQuery): Observable<PageResponse<CourseModel>> {
        try {
            let params = new HttpParams()
                .set('pageNumber', query.pageNumber.toString())
                .set('pageSize', query.pageSize.toString())
                .set('searchValue', query.searchValue.toString());

            return this.http.get<PageResponse<CourseModel>>(Routes.COURSE_GET_ALL_ROUTE, {
                params
            });
        } catch (error) {
            console.log(error?.message);
        }
    }
}