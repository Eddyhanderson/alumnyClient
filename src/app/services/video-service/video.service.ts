import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoModel } from 'src/app/models/video-model/video.model';
import { Routes } from 'src/app/shared/utils/routing-constants';
import { Response } from '../../models/response/response';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  public upload(file: File): Observable<any> {
    var formData = new FormData();
    formData.append('file', file);

    return this.http.post<Response<VideoModel>>(Routes.VIDEO_UPLOAD_ROUTE, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
