import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';

@Component({
  selector: 'app-user-role-update',
  templateUrl: './user-role-update.component.html',
  styleUrls: ['./user-role-update.component.scss']
})
export class UserRoleUpdateComponent implements OnInit {
  userRoleUpdateForm: FormGroup;
  userOperationClaim: UserOperationClaim;
  operationClaims: OperationClaim[];

  id: number;
  userId: number;
  operationClaimId: number;

  clicked = false;

  constructor(
    private userOperationClaimService: UserOperationClaimService,
    private operationClaimService: OperationClaimService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["userId"]) {
        this.id = params["userId"];
        this.getUserOperationClaimById(params["userId"]);
        this.createUserOperationClaimUpdateForm();
      }
    });
    this.getOperationClaims();
  }

  createUserOperationClaimUpdateForm() {
    this.userRoleUpdateForm = this.formBuilder.group({
      id: [this.id ? this.id : ""],
      userId: [this.userId ? this.userId : ""],
      operationClaimId: [this.operationClaimId ? this.operationClaimId : ""],
    });
  }

  getOperationClaims() {
    this.operationClaimService
      .get()
      .subscribe((response) => (this.operationClaims = response.data));
  }

  getUserOperationClaimById(userId: number) {
    this.userOperationClaimService.getUserOperatinClaimByUserId(userId).subscribe((response) => {
      this.userOperationClaim = Object.assign({}, response.data);
      this.id = this.userOperationClaim.id;
      this.userId = this.userOperationClaim.userId;
      this.operationClaimId = this.userOperationClaim.operationClaimId;
      this.createUserOperationClaimUpdateForm();
    });
  }

  update() {
    if (this.userRoleUpdateForm.valid) {
      let userRoleClaimModel = Object.assign({}, this.userRoleUpdateForm.value);
      this.userOperationClaimService.update(userRoleClaimModel).subscribe(
        (response) => {
          this.clicked = true;
          this.toastrService.success(response.message, "Success");
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
    } else {
      this.toastrService.warning("Form is not valid", "Warning");
    }
  }
}
