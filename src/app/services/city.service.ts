import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { City } from "../models/city";
import { ListResponseModel } from "../models/listResponseModel";
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: "root",
})
export class CityService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<ListResponseModel<City>> {
    let newPath = environment.apiUrl + "cities/getall";
    return this.httpClient.get<ListResponseModel<City>>(newPath);
  }

  add(city: City): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "cities/add",
      city
    );
  }

  update(city: City): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "cities/update",
      city
    );
  }

  delete(city: City): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "cities/delete",
      city
    );
  }
}
