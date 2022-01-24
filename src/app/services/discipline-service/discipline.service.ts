import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/shared/utils/constants';
import { Routes } from 'src/app/shared/utils/routing-constants';

// Model imports
import { DisciplineModel } from '../../models/discipline-model/discipline.model';
import { CreationResult } from '../../models/creation-result/creation-result';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { Observable } from 'rxjs';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(private http: HttpClient) { }

  /**
   * Create a new discipline
   * @param discipline the new discipline that will be created
   */
  public async create(discipline: DisciplineModel): Promise<CreationResult<DisciplineModel>> {
    if (discipline == null) return null;

    try {
      var response = await this.http.post<CreationResult<DisciplineModel>>(Routes.DISCIPLINE_CREATE_ROUTE, discipline).toPromise();
      return response;
    } catch (error) {
      console.log(error.message);
    }

  }

  /**
   * Get all discipline. If search value are seted, we'll receive discipline that match in it
   * @param query the data of pagination feature
   */
  public getAll(query: PaginationQuery): Observable<PageResponse<DisciplineModel>> {
    let params = this.queryParamsBuild(query);

    try {
      return this.http.get<PageResponse<DisciplineModel>>(Routes.DISCIPLINE_GET_ALL_ROUTE, { params });
    } catch (error) {
      console.log(error.message);
    }

  }

  private queryParamsBuild(query: PaginationQuery): HttpParams {
    return new HttpParams().set('pageNumber', query.pageNumber.toString())
      .set('pageSize', query.pageSize.toString())
      .set('searchValue', query.searchValue ?? '');
  }
}
