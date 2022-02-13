import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TeacherModel } from '../../models/teacher-model/teacher-model';
import { Response } from '../../models/response/response';
import { CreationResult } from '../../models/creation-result/creation-result';
import { Routes } from '../../shared/utils/routing-constants';
import { BehaviorSubject, Observable, Subject, } from 'rxjs';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { AccountService } from '../account-service/account.service';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { TeacherQuery } from 'src/app/queries/teacher-query/teacher.query';
import { SchoolModel } from 'src/app/models/school-model/school.model';


@Injectable(
    { providedIn: "root" }
)
export class SchoolService {

    constructor(private http: HttpClient) { }

    /**
     * Registration of teacher
     * @param teacherModel the teacher who will be persisted
     */
    public async create(teacherModel: TeacherModel): Promise<CreationResult<TeacherModel>> {

        try {
            let creationResult = await this.http.post<CreationResult<TeacherModel>>(Routes.TEACHER_CREATE_ROUTE, teacherModel)
                .toPromise();

            if (creationResult.succeded) {
                //this.persistSchoolData(creationResult.data);

                return creationResult;
            }

        } catch (error) {
            console.log(error.message);
        }

        return null;
    }

    /**
     * Get the data of the teacher 
     * @param teacherId the id of the teacher
     * @returns the teacher data
     */
    public async get(teacherId: string): Promise<TeacherModel> {

        try {
            let response = await this.http
                .get<Response<TeacherModel>>(Routes.TEACHER_GET_ROUTE.replace("{id}", teacherId))
                .toPromise();
            return response.data;

        } catch (error) {
            console.log(error.message)
            return null;
        }
    }

    /**
     * Get all studant data
     * @param query the query string to get data from server
     * @param param the custom data criteria
     * @returns the teacher data
     */
    public getAll(query: PaginationQuery, param: TeacherQuery): Observable<PageResponse<TeacherModel>> {

        try {
            return this.http.get<PageResponse<TeacherModel>>(Routes.TEACHER_GET_ALL_ROUTE, {
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
