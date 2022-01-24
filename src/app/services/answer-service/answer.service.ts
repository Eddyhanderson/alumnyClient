import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnswerModel } from "src/app/models/answer-model/answer.model";
import { CreationResult } from "src/app/models/creation-result/creation-result";
import { PageResponse } from "src/app/models/page-response/page-response";
import { AnswerQuery } from "src/app/queries/answer-query/answer.query";
import { PaginationQuery } from "src/app/queries/pagination-query/pagination-query";
import { Routes } from "src/app/shared/utils/routing-constants";

@Injectable({providedIn: "root"})
export class AnswerService {

    public constructor(private http:HttpClient){

    }

    public async create(answer:AnswerModel):Promise<CreationResult<AnswerModel>>{

        if(answer == null) return null;

        try {
            return await this.http.post<CreationResult<AnswerModel>>(Routes.ANSWER_CREATE_ROUTE,answer).toPromise();
        } catch (error) {
            console.log(error.message);
        }
    }

    public getAll(pagination: PaginationQuery, param:AnswerQuery): Observable<PageResponse<AnswerModel>> {
        if (pagination == null) return null;

        try {
            var response = this.http.get<PageResponse<AnswerModel>>(Routes.ANSWER_GET_ALL_ROUTE, {
                params: {
                    'pageNumber': pagination.pageNumber.toString(),
                    'pageSize': pagination.pageSize.toString(),
                    'searchValue': pagination.searchValue,
                    ...param
                }
            });

            return response;

        } catch (error) {
            console.log(error.message);
        }
    }
}