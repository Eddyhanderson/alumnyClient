import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Routes } from "src/app/shared/utils/routing-constants";
import { Response } from 'src/app/models/response/response';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})
export class ImageService {
    constructor(private http: HttpClient) { }

    public uploadImageModule(file: File): Observable<Response<string>> {
        var formData = new FormData();
        formData.append('file', file);

        try {
            return this.http.post<Response<string>>(Routes.IMAGE_UPLOAD_MODULE, formData);
        } catch (error) {
            console.log(error.message);
        }
    }

    public uploadImageLesson(file: File): Observable<Response<string>> {
        var formData = new FormData();
        formData.append('file', file);

        try {
            return this.http.post<Response<string>>(Routes.IMAGE_UPLOAD_LESSON_PROFILE, formData);
        } catch (error) {
            console.log(error.message);
        }
    }

    public uploadTopicImage(file: File): Observable<Response<string>> {
        var formData = new FormData();
        formData.append('file', file);

        try {
            return this.http.post<Response<string>>(Routes.IMAGE_UPLOAD_TOPIC, formData);
        } catch (error) {
            console.log(error.message);
        }
    }
}