import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListResponseModel } from "../models/listResponseModel";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<ListResponseModel<User>> {
    let newPath = environment.apiUrl + "users/getall";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserById(userId: number): Observable<SingleResponseModel<User>> {
    let newPath = environment.apiUrl + "users/getbyid?id=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getUserByEmail(email: string): Observable<SingleResponseModel<User>> {
    let newPath = environment.apiUrl + "users/getbyemail?email=" + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(user: User): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "users/update";
    return this.httpClient.post<ResponseModel>(newPath, user);
  }

  delete(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "users/delete",
      user
    );
  }
}
