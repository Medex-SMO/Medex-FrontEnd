import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {

  constructor(private httpClient: HttpClient) {}

  get(): Observable<ListResponseModel<OperationClaim>> {
    let newPath = environment.apiUrl + "operationclaims/getall";
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }

  getOperationClaimById(operationClaimId: number): Observable<SingleResponseModel<OperationClaim>> {
    let newPath = environment.apiUrl + "operationclaims/getbyid?id=" + operationClaimId;
    return this.httpClient.get<SingleResponseModel<OperationClaim>>(newPath);
  }

  add(operationClaim: OperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "operationclaims/add",operationClaim);
  }

  update(operationClaim: OperationClaim): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "operationclaims/update";
    return this.httpClient.post<ResponseModel>(newPath, operationClaim);
  }

  delete(operationClaim: OperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "operationclaims/delete",
      operationClaim
    );
  }
}
