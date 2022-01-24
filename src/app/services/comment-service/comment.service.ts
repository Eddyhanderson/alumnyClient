import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommentModel } from "src/app/models/comment-model/comment.model";
import { CreationResult } from "src/app/models/creation-result/creation-result";
import { PageResponse } from "src/app/models/page-response/page-response";
import { CommentQuery } from "src/app/queries/comment-query/comment.query";
import { PaginationQuery } from "src/app/queries/pagination-query/pagination-query";
import { Routes } from "src/app/shared/utils/routing-constants";

@Injectable({
    providedIn: "root"
})
export class CommentService {
    constructor(private http: HttpClient) { }

    public async create(comment: CommentModel): Promise<CreationResult<CommentModel>> {
        if (comment == null) return null;

        try {
            var response = await this.http.post<CreationResult<CommentModel>>(Routes.COMMENT_CREATE_ROUTE, comment).toPromise();
            return response;
        } catch (error) {
            console.log(error.message);
        }

    }

    public getAll(query: PaginationQuery, param: CommentQuery): Observable<PageResponse<CommentModel>> {

        try {
            return this.http.get<PageResponse<CommentModel>>(Routes.COMMENT_GET_ALL_ROUTE, {
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
}