import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "src/app/models/user-model/user-model";
import { Routes } from "src/app/shared/utils/routing-constants";
import { Response } from 'src/app/models/response/response';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    public async get(id: string): Promise<UserModel> {
        try {
            let response = await this.http.get<Response<UserModel>>(Routes.USER_GET_ROUTE
                .replace('{id}', id)).toPromise();
            return response?.data;
        } catch (error) {

        }
    }
}