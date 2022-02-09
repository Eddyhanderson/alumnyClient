import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreationResult } from "src/app/models/creation-result/creation-result";
import { OrganModel } from "src/app/models/organ-model/organ-model";
import { Routes } from "src/app/shared/utils/routing-constants";

@Injectable({
    providedIn: 'root'
})
export class OrganService {

    constructor(private http: HttpClient) { }
    
     /**
     * Create a given organ
     * @param organ the organ data to be created
     */
      public create(organ: OrganModel): Promise<CreationResult<OrganModel>> {

        if (organ == null) return null;

        try {
            return this.http.post<CreationResult<OrganModel>>(Routes.ORGAN_CREATE_ROUTE, organ).toPromise();
        } catch (error) {
            console.log(error.message);
        }
    }
}