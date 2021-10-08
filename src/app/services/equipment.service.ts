import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Equipment } from "../models/equipment";
import { EquipmentModel } from "../models/equipmentModel";
import { ListResponseModel } from "../models/listResponseModel";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";

@Injectable({
  providedIn: "root",
})
export class EquipmentService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<ListResponseModel<Equipment>> {
    let newPath = environment.apiUrl + "equipments/getall";
    return this.httpClient.get<ListResponseModel<Equipment>>(newPath);
  }

  getEquipmentsDetails(): Observable<ListResponseModel<EquipmentModel>> {
    let newPath = environment.apiUrl + "equipments/getequipmentsdetails";
    return this.httpClient.get<ListResponseModel<EquipmentModel>>(newPath);
  }

  add(site: Equipment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "equipments/add",
      site
    );
  }

  update(site: Equipment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "equipments/update",
      site
    );
  }

  delete(site: Equipment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + "equipments/delete",
      site
    );
  }

  getEquipmentById(siteId: number): Observable<SingleResponseModel<Equipment>> {
    let newPath = environment.apiUrl + "equipments/getbyid?id=" + siteId;
    return this.httpClient.get<SingleResponseModel<Equipment>>(newPath);
  }
}
