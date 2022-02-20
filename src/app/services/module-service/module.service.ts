import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { ModuleModel as ModuleModel } from 'src/app/models/module-model/modules.model';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { ModuleQuery } from 'src/app/queries/module-query/module-query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
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

  public getAll(query: PaginationQuery, param: ModuleQuery): Observable<PageResponse<ModuleModel>> {
    try {
      return this.http.get<PageResponse<ModuleModel>>(Routes.MODULE_GET_ALL_ROUTE, {
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
