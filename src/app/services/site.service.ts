import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListResponseModel } from "../models/listResponseModel";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";
import { Site } from "../models/site";
import { SiteModel } from "../models/siteModel";

@Injectable({
  providedIn: "root",
})
export class SiteService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<ListResponseModel<Site>> {
    let newPath = environment.apiUrl + "sites/getall";
    return this.httpClient.get<ListResponseModel<Site>>(newPath);
  }

  getSitesByStudy(studyId: number): Observable<ListResponseModel<Site>> {
    let newPath = environment.apiUrl + "sites/getsitesbystudyid?id=" + studyId;
    return this.httpClient.get<ListResponseModel<Site>>(newPath);
  }

  getSitesDetails(): Observable<ListResponseModel<SiteModel>> {
    let newPath = environment.apiUrl + "sites/getsitesdetails";
    return this.httpClient.get<ListResponseModel<SiteModel>>(newPath);
  }

  add(site: Site): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "sites/add",
      site
    );
  }

  update(site: Site): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "sites/update",
      site
    );
  }

  delete(site: Site): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "sites/delete",
      site
    );
  }

  getSiteById(siteId: number): Observable<SingleResponseModel<Site>> {
    let newPath = environment.apiUrl + "sites/getbyid?id=" + siteId;
    return this.httpClient.get<SingleResponseModel<Site>>(newPath);
  }

  getSiteBySiteNumber(siteNumber: string): Observable<SingleResponseModel<Site>> {
    let newPath = environment.apiUrl + "sites/getbysitenumber?sitenumber=" + siteNumber;
    return this.httpClient.get<SingleResponseModel<Site>>(newPath);
  }

  getSitesDetailByUserId(userId: number): Observable<ListResponseModel<SiteModel>> {
    let newPath = environment.apiUrl + "sites/getsitesdetailsbyuserid?userid=" + userId;
    return this.httpClient.get<ListResponseModel<SiteModel>>(newPath);
  }
}
