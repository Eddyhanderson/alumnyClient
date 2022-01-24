import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { PageResponse } from '../../models/page-response/page-response';
import { Response } from '../../models/response/response';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';

import { Routes } from 'src/app/shared/utils/routing-constants';
import { TeacherSchoolsModel } from '../../models/teacher-schools-model/teacher-schools.model';
import { Observable } from 'rxjs';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { TeacherSchoolQuery } from 'src/app/queries/teacher-schools-query/teacher-school.query';


@Injectable({
    providedIn: "root"
})
export class TeacherSchoolsService {
    constructor(private http: HttpClient) { }

    /**
     * Send the data to be persisted
     * @param data contain the data about the teacher request to make part 
     * @returns the state of the creation
     */
    async create(data: TeacherSchoolsModel): Promise<any> {

        if (data == null) return null;

        try {
            let response = await this.http.post<any>(Routes.TEACHER_SCHOOLS_CREATE_ROUTE, data).toPromise();

            if (response.succeded) {
                return response.data;
            } else return null;

        } catch (error) {
            console.log(error.message)
        }
    }

    /**
     * Send the data to be persisted
     * @param data contain the data about the teacher request to make part 
     * @returns the state of the creation
     */
    public async update(teacherId: string, schoolId: string, teacherSchool: TeacherSchoolsModel): Promise<boolean> {

        if (teacherId == null || schoolId == null) return null;

        if (teacherId !== teacherSchool.teacher.id || schoolId !== teacherSchool.school.id)
            return null;

        try {
            return await this.http.put<boolean>(
                Routes.TEACHER_SCHOOLS_UPDATE_ROUTE.replace("{teacherId}", teacherId)
                    .replace("{schoolId}", schoolId), teacherSchool).toPromise();

        } catch (error) {
            console.log(error.message)
        }
    }


    /**
     * Get all teacher schools 
     * @param pQuery query parameters of pagination
     * @param tsQuery query strings of teacher school
     * @returns a page response with data necessary to create pagination
     */
    public getAll(pQuery: PaginationQuery, param: TeacherSchoolQuery): Observable<PageResponse<TeacherSchoolsModel>> {
        try {
            return this.http
                .get<PageResponse<TeacherSchoolsModel>>(Routes.TEACHER_SCHOOLS_GET_ALL_ROUTE, {
                    params: {
                        'pageNumber': pQuery.pageNumber.toString() ?? '',
                        'pageSize': pQuery.pageSize.toString() ?? '',
                        'searchValue': pQuery.searchValue ?? '',
                        ...param
                    }
                });
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * Check if the teacher is in any school
     * @param teacherId the teacher being researched
     */
    public async checkTeacherHasSchool(teacherId: string): Promise<boolean> {
        try {
            var response = await this.http.
                get<Response<boolean>>(Routes.TEACHER_SCHOOLS_CHECK_TEACHER_HAS_SCHOOL_ROUTE.replace('{teacherId}', teacherId)).toPromise();

            return response.data;
        } catch (error) {
            console.log(error.message);
        }
    }
}
