import { Injectable } from '@angular/core';
import { Response } from '../../models/response/response';
import { HttpClient } from '@angular/common/http';
import { SubscriptionModel } from 'src/app/models/subscription-model/subscription-model';
import { Routes } from 'src/app/shared/utils/routing-constants';

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
}
