import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CertificateModel } from 'src/app/models/certificate-models/certificate.model';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

    public async create(certificate: CertificateModel): Promise<CreationResult<CertificateModel>> {
        if (certificate == null) return null;

        try {
            var response = await this.http.post<CreationResult<CertificateModel>>(Routes.CERTIFICATE_CREATE_ROUTE, certificate).toPromise();
            return response;
        } catch (error) {
            console.log(error.message);
        }

    }
}
