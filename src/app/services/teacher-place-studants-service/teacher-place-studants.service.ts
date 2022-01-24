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
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { TeacherPlaceStudantsModel } from 'src/app/models/teacher-place-studants-model/teacher-place-studants.model';


@Injectable({
    providedIn: "root"
})
export class TeacherPlaceStudantsService {
    constructor(private http: HttpClient) { }

    /**
     * Send the data to be persisted
     * @param data contain the data about the teacher request to make part 
     * @returns the state of the creation
     */
    async create(data: TeacherPlaceStudantsModel): Promise<CreationResult<TeacherPlaceStudantsModel>> {

        if (data == null) return null;

        try {
            return await this.http.post<CreationResult<TeacherPlaceStudantsModel>>(Routes.TEACHER_PLACE_STUDANTS_CREATE_ROUTE, data).toPromise();
        } catch (error) {
            console.log(error.message)
        }
    }

    // TODO: To edit
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


    // TODO: To edit
    /**
     * Get all teacher schools 
     * @param pQuery query parameters of pagination
     * @param tsQuery query strings of teacher school
     * @returns a page response with data necessary to create pagination
     */
    public getAll(pQuery: PaginationQuery, tsQuery: TeacherSchoolQuery): Observable<PageResponse<TeacherSchoolsModel>> {
        let queryParams = this.createQueryParams(pQuery, tsQuery);

        try {
            return this.http
                .get<PageResponse<TeacherSchoolsModel>>(Routes.TEACHER_SCHOOLS_GET_ALL_ROUTE, { params: queryParams });
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * Check if the teacher is in any school
     * @param teacherPlaceId the teacherPlace being researched
     * @param studantId the studant being researched
     */
    public async get(teacherPlaceId: string, studantId: string): Promise<TeacherPlaceStudantsModel> {
        try {
            var response = await this.http.
                get<Response<TeacherPlaceStudantsModel>>(Routes.TEACHER_PLACE_STUDANTS_GET_ROUTE
                    .replace('{teacherPlaceId}', teacherPlaceId)
                    .replace('{studantId}', studantId)).toPromise();
            return response?.data;
        } catch (error) {
            console.log(error.message);
        }
    }

    private createQueryParams(query: PaginationQuery, params: TeacherSchoolQuery): HttpParams {
        return new HttpParams()
            .set('pageNumber', query.pageNumber.toString() ?? '')
            .set('pageSize', query.pageSize.toString() ?? '')
            .set('searchValue', query.searchValue ?? '')
            .set('schoolId', params.schoolId ?? '')
            .set('teacherId', params.teacherId ?? '')
            .set('situation', params.situation ?? '');
    }
}
