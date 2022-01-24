import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreationResult } from "src/app/models/creation-result/creation-result";
import { PageResponse } from "src/app/models/page-response/page-response";
import { TopicModel } from "src/app/models/topic-model/topic.model";
import { Response } from "src/app/models/response/response";
import { PaginationQuery } from "src/app/queries/pagination-query/pagination-query";
import { TopicQuery } from "src/app/queries/topic-query/topic.query";
import { Routes } from "src/app/shared/utils/routing-constants";


@Injectable({
    providedIn: 'root'
})
export class TopicService {

    constructor(private http: HttpClient) { }

    /**
   * Create a new discipline
   * @param topic the new topic that will be created
   */
    public async create(topic: TopicModel): Promise<CreationResult<TopicModel>> {
        if (topic == null) return null;

        try {
            var response = await this.http.post<CreationResult<TopicModel>>(Routes.TOPIC_CREATE_ROUTE, topic).toPromise();
            return response;
        } catch (error) {
            console.log(error.message);
        }

    }

    public async get(id: string): Promise<TopicModel> {

        try {
            var response = await this.http.get<Response<TopicModel>>(Routes.TOPIC_GET_ROUTE.replace("{topicId}", id)).toPromise();

            if (response?.data != null)
                return response.data;
        } catch (error) {
            console.log(error.message)
        }

    }

    public getAll(query: PaginationQuery, params?: TopicQuery): Observable<PageResponse<TopicModel>> {

        try {
            return this.http.get<PageResponse<TopicModel>>(Routes.TOPIC_GET_ALL_ROUTE, {
                params: {
                    'pageSize': query.pageSize.toString() ?? '',
                    'pageNumber': query.pageNumber.toString() ?? '',
                    'searchValue': query.searchValue ?? '',
                    ...params
                }
            })

        } catch (error) {
            console.log(error.message)
        }

    }
}