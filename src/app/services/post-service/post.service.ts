import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, } from 'rxjs/operators';
import { PageResponse } from '../../models/page-response/page-response';
import { Response } from '../../models/response/response';
import { TeacherPlaceModel } from '../../models/teacher-place-model/teacher-place.model';

import { Routes } from '../../shared/utils/routing-constants';
import { CreationResult } from '../../models/creation-result/creation-result';
import { IfStmt } from '@angular/compiler';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { PostModel } from 'src/app/models/post-model/post.model';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { TeacherPlaceQuery } from 'src/app/queries/teacher-place-query/teacher-places.query';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) { }

    /**
     * Create a given post
     * @param post the post data to be created
     */
    public create(post: PostModel): Promise<CreationResult<PostModel>> {

        if (post == null) return null;

        try {
            return this.http.post<CreationResult<PostModel>>(Routes.POST_CREATE_ROUTE, post).toPromise();
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * Get all teacher place in data base
     * @param pQuery to pagination concerne query params
     * @param param to customize the data fecth
     */

    /*
    public getAll(pQuery?: PaginationQuery, param?: TeacherPlaceQuery): Observable<PageResponse<TeacherPlaceModel>> {
      let queryParams = this.createQueryParams(pQuery, param);
  
      try {
        return this.http.get<PageResponse<TeacherPlaceModel>>(Routes.TEACHER_PLACE_GET_ALL_ROUTE, { params: queryParams });
      } catch (error) {
        console.log(error.message);
      }
    }*/

    /**
    * Get post by id
    * @param id the key value that identify post
    */
    public async get(id: string): Promise<PostModel> {
        try {
            let response = await this.http.get<Response<PostModel>>(Routes.POST_GET_ROUTE.replace('{postId}', id)).toPromise();
            return response.data;
        } catch (error) {
            console.log(error.message);
        }
    }


    private createQueryParams(query: PaginationQuery, params: TeacherPlaceQuery): HttpParams {
        return new HttpParams()
            .set('pageNumber', query?.pageNumber.toString())
            .set('pageSize', query?.pageSize.toString())
            .set('searchValue', query?.searchValue ?? '')
            .set('schoolId', params?.schoolId)
            .set('teacherId', params?.teacherId)
    }
}
