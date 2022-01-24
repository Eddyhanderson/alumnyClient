import { Injectable } from '@angular/core';

import { CourseModel } from '../../models/course-model/course.model';
import { PageResponse } from '../../models/page-response/page-response';
import { Routes } from '../../shared/utils/routing-constants';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { SchoolCourseModel } from 'src/app/models/school-course-model/school-course.model';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { SchoolCourseQuery } from 'src/app/queries/school-course-query/school-course.query';

@Injectable(
    { providedIn: 'root' }
)
export class SchoolCourseService {

    constructor(private http: HttpClient) { }



    /**
     * To create new course of the school
     * @param schoolCourse the model that will be created
     */
    public async create(schoolCourse: SchoolCourseModel): Promise<CreationResult<SchoolCourseModel>> {
        try {
            return this.http.post<CreationResult<SchoolCourseModel>>(Routes.SCHOOL_COURSE_CREATE_ROUTE, schoolCourse).toPromise();
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * Get all courses of some school
     * @param query the query parameter to list result with pagination
     * @param schoolId the school id key 
     */
    public getAll(query: PaginationQuery, param: SchoolCourseQuery): Observable<PageResponse<SchoolCourseModel>> {
        let queryParams = this.queryParamsBuild(query, param);

        try {
            return this.http
                .get<PageResponse<SchoolCourseModel>>(Routes.SCHOOL_COURSE_GET_ALL_ROUTE, { params: queryParams });
                
        } catch (error) {
            console.log("Error: " + error.message)
        }
    }

    private queryParamsBuild(query: PaginationQuery, params: SchoolCourseQuery): HttpParams {
        return new HttpParams()
            .set('pageNumber', query.pageNumber.toString() ?? '')
            .set('pageSize', query.pageSize.toString() ?? '')
            .set('searchValue', query.searchValue ?? '')
            .set('schoolId', params.schoolId ?? '')
            .set('courseId', params.courseId ?? '')
            .set('situation', params.situation ?? '');
    }
}