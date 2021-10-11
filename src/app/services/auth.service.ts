import { RegisterModel } from "./../models/registerModel";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "src/environments/environment";
import { LoginModel } from "../models/loginModel";
import { SingleResponseModel } from "../models/singleResponseModel";
import { TokenModel } from "../models/tokenModel";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: any;

  public currentUserId: number;
  public currentRoles: string;
  apiUrl = environment.baseUrl;
  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: LocalStorageService,
    private httpClient: HttpClient
  ) {
    this.setUserStats();
  }

  loginByAuth(user: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    try {
      this.userService.getUserByEmail(user.email).subscribe((response) => {
        this.user = response.data;
      });
      return this.httpClient.post<SingleResponseModel<TokenModel>>(
        environment.apiUrl + "auth/login",
        user
      );
    } catch (error) {
        console.log(error.response.data.message);
    }
  }

  registerByAuth(user: RegisterModel) {
    try {
      return this.httpClient.post<SingleResponseModel<TokenModel>>(
        environment.apiUrl + "auth/register",
        user
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    this.user = null;
    this.currentRoles = null;
    this.currentUserId = null;
    this.router.navigate(["/auth/login"]);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (this.jwtHelperService.isTokenExpired(token) === true) {
      return false;
    } else {
      return true;
    }
  }

  setCurrentUserId() {
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter((x) =>
      x.endsWith("/nameidentifier")
    )[0];
    this.currentUserId = Number(decoded[propUserId]);
  }
  setRoles() {
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter((x) => x.endsWith("/role"))[0];
    this.currentRoles = String(decoded[propUserId]);
  }
  getCurrentRoles(): string {
    return this.currentRoles;
  }
  getCurrentUserId(): number {
    return this.currentUserId;
  }
  getDecodedToken() {
    try {
      return this.jwtHelperService.decodeToken(this.storageService.getToken());
    } catch (Error) {
      return null;
    }
  }
  async setUserStats() {
    if (this.isAuthenticated()) {
      this.setCurrentUserId();
      this.setRoles();
      this.setUserName(this.user.email);
    }
  }

  setUserName(fullName: string) {
    localStorage.setItem("fullName", fullName);
  }

  getEmail(): string {
    return localStorage.getItem("fullName");
  }
}
