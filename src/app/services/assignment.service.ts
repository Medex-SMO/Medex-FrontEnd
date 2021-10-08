import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Assignment } from "../models/assignment";
import { AssignmentModel } from "../models/assignmentModel";
import { ListResponseModel } from "../models/listResponseModel";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";

@Injectable({
  providedIn: "root",
})
export class AssignmentService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<ListResponseModel<Assignment>> {
    let newPath = environment.apiUrl + "assignments/getall";
    return this.httpClient.get<ListResponseModel<Assignment>>(newPath);
  }

  getAssignmentsDetails(): Observable<ListResponseModel<AssignmentModel>> {
    let newPath = environment.apiUrl + "assignments/getassignmentsdetails";
    return this.httpClient.get<ListResponseModel<AssignmentModel>>(newPath);
  }

  add(study: Assignment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "assignments/add",
      study
    );
  }

  update(study: Assignment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "assignments/update",
      study
    );
  }

  delete(study: Assignment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "assignments/delete",
      study
    );
  }

  getAssignmentById(
    studyId: number
  ): Observable<SingleResponseModel<Assignment>> {
    let newPath = environment.apiUrl + "assignments/getbyid?id=" + studyId;
    return this.httpClient.get<SingleResponseModel<Assignment>>(newPath);
  }
}
