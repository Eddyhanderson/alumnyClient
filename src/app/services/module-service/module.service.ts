import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { ModulesModel as ModuleModel } from 'src/app/models/module-model/modules.model';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }

  /**
  * Create a given organ
  * @param module the module data to be created
  */
  public async create(module: ModuleModel): Promise<CreationResult<ModuleModel>> {

    if (module == null) return null;
    
    try {
      return await this.http.post<CreationResult<ModuleModel>>(Routes.MODULE_CREATE_ROUTE, module).toPromise();
    } catch (error) {
      console.log(error.message);
    }
  }
}
