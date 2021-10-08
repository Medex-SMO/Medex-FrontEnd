import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListResponseModel } from "../models/listResponseModel";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";
import { Visit } from "../models/visit";
import { VisitModel } from "../models/visitModel";

@Injectable({
  providedIn: "root",
})
export class VisitService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<ListResponseModel<Visit>> {
    let newPath = environment.apiUrl + "visits/getall";
    return this.httpClient.get<ListResponseModel<Visit>>(newPath);
  }

  getVisitsDetails(): Observable<ListResponseModel<VisitModel>> {
    let newPath = environment.apiUrl + "visits/getvisitsdetails";
    return this.httpClient.get<ListResponseModel<VisitModel>>(newPath);
  }

  add(visit: Visit): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "visits/add",
      visit
    );
  }

  update(visit: Visit): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "visits/update",
      visit
    );
  }

  delete(visit: Visit): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "visits/delete",
      visit
    );
  }

  getVisitById(visitId: number): Observable<SingleResponseModel<Visit>> {
    let newPath = environment.apiUrl + "visits/getbyid?id=" + visitId;
    return this.httpClient.get<SingleResponseModel<Visit>>(newPath);
  }
}
