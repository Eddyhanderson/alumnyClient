import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response/response';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { Routes } from 'src/app/shared/utils/routing-constants';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { LessonQuery } from 'src/app/queries/lesson-query/lesson.query';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }

  public async get(id: string): Promise<LessonModel> {
    try {
      let response = await this.http.get<Response<LessonModel>>(Routes.LESSON_GET_ROUTE.replace('{lessonId}', id)).toPromise();
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Create a new discipline
   * @param lesson the new discipline that will be created
   */
  public async create(lesson: LessonModel): Promise<CreationResult<LessonModel>> {
    if (lesson == null) return null;

    try {
      var response = await this.http.post<CreationResult<LessonModel>>(Routes.LESSON_CREATE_ROUTE, lesson).toPromise();
      return response;
    } catch (error) {
      console.log(error.message);
    }

  }

  public getAll(query: PaginationQuery, param: LessonQuery): Observable<PageResponse<LessonModel>> {

    try {
      return this.http.get<PageResponse<LessonModel>>(Routes.LESSON_GET_ALL_ROUTE, {
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
