import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TeacherModel } from '../../models/teacher-model/teacher-model';
import { Response } from '../../models/response/response';
import { CreationResult } from '../../models/creation-result/creation-result';
import { Routes } from '../../shared/utils/routing-constants';
import { BehaviorSubject, Observable, Subject, } from 'rxjs';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { AccountService } from '../account-service/account.service';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { StudantQuery } from 'src/app/queries/studant-query/studant.query';


@Injectable(
    { providedIn: "root" }
)
export class StudantService {

    constructor(private http: HttpClient, private as: AccountService) { }

    private teacherLoged = new BehaviorSubject<TeacherModel>(null);

    /**
     * Registration of teacher
     * @param studant the teacher who will be persisted
     */
    public async create(studant: StudantModel): Promise<CreationResult<StudantModel>> {

        try {

            let creationResult = await this.http.post<CreationResult<StudantModel>>(Routes.STUDANT_CREATE_ROUTE, studant)
                .toPromise();

            if (creationResult.succeded) {
                this.persistStudantData(creationResult.data);
                return creationResult;
            }
        } catch (error) {
            console.log(error.message)
        }


        return null;
    }

    /**
     * Get the data of the teacher 
     * @param query the query string to get data from server
     * @returns the teacher data
     */
    public async get(id: string): Promise<StudantModel> {
        try {
            let response = await this.http.get<Response<StudantModel>>(Routes.STUDANT_GET_ROUTE.replace("{id}", id)).toPromise()

            return response?.data;

        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * Get all studant data
     * @param query the query string to get data from server
     * @param param the custom data criteria
     * @returns the teacher data
     */
    public getAll(query: PaginationQuery, param: StudantQuery): Observable<PageResponse<StudantModel>> {

        try {
            return this.http.get<PageResponse<StudantModel>>(Routes.STUDANT_GET_ALL_ROUTE, {
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

    /**
     * To persist in local storage the information about teacher by user id
     * @param userId the user of the teacher
     */
    public async setStudantData(userId: string): Promise<boolean> {

        if (localStorage['studant'] !== undefined) return true;

        try {
            let studant = await this.as.getStudant(userId);

            if (studant) {
                this.persistStudantData(studant);
                return true;
            }

            return false;
        } catch (error) {
            console.log(error.message)
        }
    }

    persistStudantData(studant: StudantModel) {
        localStorage.studant = JSON.stringify(studant);
    }
}
