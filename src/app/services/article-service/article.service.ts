import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleModel } from 'src/app/models/article-model/article.model';
import { Response } from '../../models/response/response';
import { Routes } from 'src/app/shared/utils/routing-constants';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { Observable } from 'rxjs';
import { ArticleQuery } from 'src/app/queries/article-query/article.query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  public async get(id: string): Promise<ArticleModel> {
    try {
      let response = await this.http.get<Response<ArticleModel>>(Routes.ARTICLE_GET_ROUTE.replace('{articleId}', id)).toPromise();
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Create a new article as a draft
   * @param article the new article that will be created
   */
  public async create(article: ArticleModel): Promise<CreationResult<ArticleModel>> {
    if (article == null) return null;
    
    try {
      var result = await this.http.post<CreationResult<ArticleModel>>(Routes.ARTICLE_CREATE_ROUTE, article).toPromise();
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  public async update(id: string, article: ArticleModel): Promise<Response<ArticleModel>> {
    try {
      var response = await this.http.put<Response<ArticleModel>>
        (Routes.ARTICLE_UPDATE_ROUTE.replace('{articleId}', id), article).toPromise();
      return response;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  public getAll(query: PaginationQuery, param: ArticleQuery): Observable<PageResponse<ArticleModel>> {

    try {
      return this.http.get<PageResponse<ArticleModel>>(Routes.ARTICLE_GET_ALL_ROUTE, {
        params: {
          'pageNumber': query.pageNumber.toString(),
          'pageSize': query.pageSize.toString(),
          'searchValue': query.searchValue ?? '',
          'teacherId': param.teacherId ?? '',
          'draft': param.draft ? 'true' : 'false'
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}
