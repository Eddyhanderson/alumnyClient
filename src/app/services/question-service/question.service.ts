import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreationResult } from "src/app/models/creation-result/creation-result";
import { PageResponse } from "src/app/models/page-response/page-response";
import { QuestionModel } from "src/app/models/question-model/question.model";
import { Response } from "src/app/models/response/response";
import { PaginationQuery } from "src/app/queries/pagination-query/pagination-query";
import { QuestionQuery } from "src/app/queries/question-query/question.query";
import { QuestionSituations } from "src/app/shared/utils/constants";
import { Routes } from "src/app/shared/utils/routing-constants";

export class QuestionSituationDTO {
    public situation2: QuestionSituations;
}

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private http: HttpClient) { }

    public async create(question: QuestionModel): Promise<CreationResult<QuestionModel>> {
        try {
            return await this.http.post<CreationResult<QuestionModel>>(Routes.QUESTION_CREATE_ROUTE, question).toPromise();
        } catch (e) {
            console.log(e.message);
        }
    }

    public getAll(pQuery?: PaginationQuery, param?: QuestionQuery): Observable<PageResponse<QuestionModel>> {
        try {
            return this.http.get<PageResponse<QuestionModel>>(Routes.QUESTION_GET_ALL_ROUTE,
                {
                    params: {
                        'pageNumber': pQuery.pageNumber.toString(),
                        'pageSize': pQuery.pageSize.toString(),
                        'searchValue': pQuery.searchValue ?? '',
                        ...param
                    }
                });
        } catch (error) {
            console.log(error.message)
        }
    }

    public async get(id: string): Promise<Response<QuestionModel>> {
        try {
            return await this.http.get<Response<QuestionModel>>(Routes.QUESTION_GET_ROUTE.replace('{questionId}', id)).toPromise();
        } catch (e) {
            console.log(e.message);
        }
    }

    public async stateUpdate(id: string, situation: QuestionSituations): Promise<Response<QuestionModel>> {
        var patchOp = [{ op: "replace", path: "/Situation", value: `${situation.toString()}` }]


        try {
            return await this.http.patch<Response<QuestionModel>>(Routes.QUESTION_PATCH_ROUTE
                .replace('{questionId}', id), JSON.stringify(patchOp), {
                headers: {
                    "Content-Type": "application/json-patch+json"
                }
            }).toPromise();
        } catch (error) {
            console.log(error.message)
        }
    }
}