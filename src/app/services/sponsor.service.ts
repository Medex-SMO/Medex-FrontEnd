import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListResponseModel } from "../models/listResponseModel";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";
import { Sponsor } from "../models/sponsor";

@Injectable({
  providedIn: "root",
})
export class SponsorService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<ListResponseModel<Sponsor>> {
    let newPath = environment.apiUrl + "sponsors/getall";
    return this.httpClient.get<ListResponseModel<Sponsor>>(newPath);
  }

  add(sponsor: Sponsor): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "sponsors/add",
      sponsor
    );
  }

  update(sponsor: Sponsor): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "sponsors/update",
      sponsor
    );
  }

  delete(sponsor: Sponsor): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "sponsors/delete",
      sponsor
    );
  }

  getSponsorById(sponsorId: number): Observable<SingleResponseModel<Sponsor>> {
    let newPath = environment.apiUrl + "sponsors/getbyid?id=" + sponsorId;
    return this.httpClient.get<SingleResponseModel<Sponsor>>(newPath);
  }

  getSponsorByName(name: string): Observable<SingleResponseModel<Sponsor>> {
    let newPath = environment.apiUrl + "sponsors/getbyname?name=" + name;
    return this.httpClient.get<SingleResponseModel<Sponsor>>(newPath);
  }
}
