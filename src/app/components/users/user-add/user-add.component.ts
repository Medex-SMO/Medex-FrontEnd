import { UserOperationClaimService } from "./../../../services/user-operation-claim.service";
import { UserService } from "./../../../services/user.service";
import { OperationClaim } from "./../../../models/operationClaim";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { OperationClaimService } from "src/app/services/operation-claim.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.scss"],
})
export class UserAddComponent implements OnInit {
  operationClaims: OperationClaim[];
  userAddForm: FormGroup;

  clicked = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private operationClaimService: OperationClaimService,
    private userOperationClaimService: UserOperationClaimService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createUserAddForm();
    this.getOperationClaims();
  }

  generate(){
    let randPassword = Array(8).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    this.userAddForm.controls['password'].setValue(randPassword);
  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.email],
      operationClaimId: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  getOperationClaims() {
    this.operationClaimService
      .get()
      .subscribe((response) => (this.operationClaims = response.data));
  }

  add() {
    let userModel = Object.assign({}, this.userAddForm.value);
    this.authService.registerByAuth(userModel).subscribe(
      (response) => {
        this.clicked = true;
        this.toastrService.success(response.message, "Success");
        this.addRole(userModel);
        this.router.navigate(["/users"]);
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              "Validation Error"
            );
          }
        }
      }
    );
  }
  user: User;
  addRole(userModel: any) {
    this.userService.getUserByEmail(userModel.email).subscribe(
      (response) => {
        this.user = response.data;
        this.userOperationClaimService
          .add({
            id: 0,
            userId: this.user.id,
            operationClaimId: userModel.operationClaimId,
          })
          .subscribe(
            (response) => {
              console.log("Eklendi.");
            },
            (responseError) => {
              console.log("Hata");
              console.log(this.user.id);
              console.log(userModel.operationClaimId);
            }
          );
      },
      (responseError) => {
        console.log("ERR!");
      }
    );
  }
}
