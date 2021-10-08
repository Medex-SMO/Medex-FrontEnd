import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListResponseModel } from "../models/listResponseModel";
import { Patient } from "../models/patient";
import { PatientModel } from "../models/patientModel";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<ListResponseModel<Patient>> {
    let newPath = environment.apiUrl + "patients/getall";
    return this.httpClient.get<ListResponseModel<Patient>>(newPath);
  }

  getPatientsBySite(siteId: number): Observable<ListResponseModel<Patient>> {
    let newPath =
      environment.apiUrl + "patients/getpatientsbysiteid?id=" + siteId;
    return this.httpClient.get<ListResponseModel<Patient>>(newPath);
  }

  getPatientsDetails(): Observable<ListResponseModel<PatientModel>> {
    let newPath = environment.apiUrl + "patients/getpatientsdetails";
    return this.httpClient.get<ListResponseModel<PatientModel>>(newPath);
  }

  add(patient: Patient): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "patients/add",
      patient
    );
  }

  update(patient: Patient): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "patients/update",
      patient
    );
  }

  delete(patient: Patient): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "patients/delete",
      patient
    );
  }

  getPatientById(patientId: number): Observable<SingleResponseModel<Patient>> {
    let newPath = environment.apiUrl + "patients/getbyid?id=" + patientId;
    return this.httpClient.get<SingleResponseModel<Patient>>(newPath);
  }
}
