import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserOperationClaim } from '../models/userOperationClaim';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  constructor(private httpClient: HttpClient) {}

  get(): Observable<ListResponseModel<UserOperationClaim>> {
    let newPath = environment.apiUrl + "useroperationclaims/getall";
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newPath);
  }

  getUserOperationClaimById(userOperationClaimId: number): Observable<SingleResponseModel<UserOperationClaim>> {
    let newPath = environment.apiUrl + "useroperationclaims/getbyid?id=" + userOperationClaimId;
    return this.httpClient.get<SingleResponseModel<UserOperationClaim>>(newPath);
  }

  getUserOperatinClaimByUserId(userId: number): Observable<SingleResponseModel<UserOperationClaim>> {
    let newPath = environment.apiUrl + "useroperationclaims/getbyuserid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<UserOperationClaim>>(newPath);
  }

  add(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "useroperationclaims/add",userOperationClaim);
  }

  update(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "useroperationclaims/update";
    return this.httpClient.post<ResponseModel>(newPath, userOperationClaim);
  }

  delete(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "useroperationclaims/delete",
      userOperationClaim
    );
  }
}
