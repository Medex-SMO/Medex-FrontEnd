import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListResponseModel } from "../models/listResponseModel";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";
import { Study } from "../models/study";
import { StudyModel } from "../models/studyModel";

@Injectable({
  providedIn: "root",
})
export class StudyService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<ListResponseModel<Study>> {
    let newPath = environment.apiUrl + "studies/getall";
    return this.httpClient.get<ListResponseModel<Study>>(newPath);
  }

  getStudiesBySponsor(sponsorId: number): Observable<ListResponseModel<Study>> {
    let newPath =
      environment.apiUrl + "studies/getstudiesbysponsorid?id=" + sponsorId;
    return this.httpClient.get<ListResponseModel<Study>>(newPath);
  }

  getStudiesDetails(): Observable<ListResponseModel<StudyModel>> {
    let newPath = environment.apiUrl + "studies/getstudiesdetails";
    return this.httpClient.get<ListResponseModel<StudyModel>>(newPath);
  }

  add(study: Study): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "studies/add",
      study
    );
  }

  update(study: Study): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "studies/update",
      study
    );
  }

  delete(study: Study): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "studies/delete",
      study
    );
  }

  getStudyById(studyId: number): Observable<SingleResponseModel<Study>> {
    let newPath = environment.apiUrl + "studies/getbyid?id=" + studyId;
    return this.httpClient.get<SingleResponseModel<Study>>(newPath);
  }

  getStudyByProtocolCode(protocolCode: string): Observable<SingleResponseModel<Study>> {
    let newPath = environment.apiUrl + "studies/getbyprotocolcode?protocolcode=" + protocolCode;
    return this.httpClient.get<SingleResponseModel<Study>>(newPath);
  }
}
