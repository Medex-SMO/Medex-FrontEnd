import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../services/auth.service";
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private toastrService: ToastrService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole as Array<string>;
    // decode the token to get its payload
    const tokenPayload = this.authService.currentRoles;
    if (expectedRole.indexOf(tokenPayload) != -1) {
      return true;
    }
    this.toastrService.warning("You are not authorized","Warning!")
    return false;
  }
}
