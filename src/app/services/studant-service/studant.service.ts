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
import { StudantRegistration } from 'src/app/models/studant-registration/studant-registration';
import { AuthResult } from 'src/app/models/auth-result/auth-result';


@Injectable(
    { providedIn: "root" }
)
export class StudantService {

    constructor(private http: HttpClient, private accs: AccountService) { }

    /**
   * To register the new user
   * @param newStudant the studant that we are trying to register
   */
    public async registration(newStudant: StudantRegistration): Promise<CreationResult<StudantModel>> {
        if (newStudant == null) return null;

        try {
            let cretResult = await this.http.post<CreationResult<StudantModel>>(Routes.STUDANT_REGISTER_ROUTE, newStudant).toPromise();
            return cretResult;
        } catch (error) {
            console.log(error.message);
        }
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

    public async getResponsable(id: string): Promise<StudantModel> {
        try {
            let response = await this.http.get<Response<StudantModel>>(Routes.STUDANT_GET_RESPONSABLE_ROUTE.replace("{id}", id)).toPromise()

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
            let studant = await this.accs.getStudant(userId);

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
