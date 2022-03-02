import { Injectable } from '@angular/core';
import { Response } from '../../models/response/response';
import { HttpClient } from '@angular/common/http';
import { SubscriptionModel } from 'src/app/models/subscription-model/subscription-model';
import { Routes } from 'src/app/shared/utils/routing-constants';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { SubscriptionQuery } from 'src/app/queries/subscription-query/subscription-query';
import { Observable } from 'rxjs';
import { PageResponse } from 'src/app/models/page-response/page-response';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  public async get(studantId: string, formationId: string): Promise<SubscriptionModel> {
    try {
      let response = await this.http.get<Response<SubscriptionModel>>(Routes.SUBSCRIPTION_GET_ROUTE
        .replace('{studantId}', studantId)
        .replace('{formationId}', formationId)).toPromise();
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  
  public getAll(pQuery?: PaginationQuery, param?: SubscriptionQuery): Observable<PageResponse<SubscriptionModel>> {
    try {
      return this.http.get<PageResponse<SubscriptionModel>>(Routes.SUBSCRIPTION_GET_ALL_ROUTE,
        {
          params: {
            'pageNumber': pQuery.pageNumber.toString(),
            'pageSize': pQuery.pageSize.toString(),
            'searchValue': pQuery.searchValue ?? '',
            ...param
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }
}
