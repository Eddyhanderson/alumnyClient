import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { FormationEventModel } from 'src/app/models/formation-event-model/formation-event.model';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Injectable({
  providedIn: 'root'
})
export class FormationEventService {

  constructor(private http: HttpClient) { }

  public async create(event: FormationEventModel): Promise<CreationResult<FormationEventModel>> {
    try {
      return await this.http.post<CreationResult<FormationEventModel>>(Routes.FORMATION_EVENT_CREATE_ROUTE, event,).toPromise();
    } catch (error) {
      console.log(error.message)
    }
  }
}
