import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  constructor(private http:HttpClient) { }

  public async create(formation: FormationModel): Promise<CreationResult<FormationModel>> {
    try {
      return await this.http.post<CreationResult<FormationModel>>(Routes.FORMATION_CREATE_ROUTE, formation,).toPromise();
    } catch (error) {
      console.log(error.message)
    }        
  }

}
