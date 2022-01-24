import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Response } from '../../models/response/response';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ManagerModel } from 'src/app/models/manager-model/manager.model';
import { Routes } from '../../shared/utils/routing-constants';

export interface ManagerRequest {
    id: string,
    userId: string,
    schoolId: string
};

@Injectable({
    providedIn: "root"
})
export class ManagerService {

    private managerRequest: ManagerRequest;

    constructor(private http: HttpClient) { }

    /**
     * Allow registration of the certain manager
     * @param manager the data that will be persisted about the school
     */
    create(manager: ManagerModel): Promise<any> {
        this.managerRequest = {
            id: manager.id,
            userId: manager.user.id,
            schoolId: manager.school.id
        };

        return this.http.post(Routes.MANAGER_CREATE_ROUTE, this.managerRequest).toPromise();
    }

    /**
     * To persist in local storage the information about manager by user id
     * @param userId the user of the manager
     */
    public async setManagerData(userId: string): Promise<boolean> {

        if (localStorage.manager !== undefined) return true;

        try {
            let response = await this.http
                .get<Response<ManagerModel>>(Routes.MANAGER_GET_BY_USER_ROUTE.replace('{userId}', userId))
                .toPromise();

            if (response) {
                this.persistManagerData(response.data);
                return true;
            }

            return false;
        } catch (error) {
            console.log("ERROR LOG: " + error.message)
        }
    }

    persistManagerData(manager: ManagerModel) {
        localStorage.manager = JSON.stringify(manager);
    }
}