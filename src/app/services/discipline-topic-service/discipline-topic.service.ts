import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { DisciplineTopicModel } from 'src/app/models/discipline-topic-model/discipline-topic.model';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { DisciplineTopicQuery } from 'src/app/queries/discipline-topic-query/discipline-topic.query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Injectable({
  providedIn: 'root'
})
export class DisciplineTopicService {

  constructor(private http: HttpClient) { }

  /**
   * Create a new discipline
   * @param disciplineTopic the new discipline that will be created
   */
  public async create(disciplineTopic: DisciplineTopicModel): Promise<CreationResult<DisciplineTopicModel>> {
    if (disciplineTopic == null) return null;

    try {
      var response = await this.http.post<CreationResult<DisciplineTopicModel>>(Routes.DISCIPLINE_TOPIC_CREATE_ROUTE, disciplineTopic).toPromise();
      return response;
    } catch (error) {
      console.log(error.message);
    }

  }

  public getAll(query: PaginationQuery, params?: DisciplineTopicQuery): Observable<PageResponse<DisciplineTopicModel>> {

    try {
      return this.http.get<PageResponse<DisciplineTopicModel>>(Routes.DISCIPLINE_TOPIC_GET_ALL_ROUTE, {
        params: {
          'pageSize': query.pageSize.toString() ?? '',
          'pageNumber': query.pageNumber.toString() ?? '',
          'searchValue': query.searchValue ?? '',
          'teacherPlaceId': params?.teacherPlaceId ?? '',
          'schoolId': params?.schoolId ?? '',
          'teacherId': params?.teacherId ?? ''
        }
      })

    } catch (error) {
      console.log(error.message)
    }
  }
}
