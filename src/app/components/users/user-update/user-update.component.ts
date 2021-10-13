import { Byte } from "@angular/compiler/src/util";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.scss"],
})
export class UserUpdateComponent implements OnInit {
  userUpdateForm: FormGroup;
  user: User;

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: Byte[];
  passwordSalt: Byte[];
  status: boolean;

  clicked = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["userId"]) {
        this.id = params["userId"];
        this.getUserById(params["userId"]);
        this.createUserUpdateForm();
      }
    });
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      firstName: [this.firstName ? this.lastName : "", Validators.required],
      lastName: [this.lastName ? this.lastName : "", Validators.required],
      passwordHash: [
        this.passwordHash ? this.passwordHash : "",
        Validators.required,
      ],
      passwordSalt: [
        this.passwordSalt ? this.passwordSalt : "",
        Validators.required,
      ],
      email: [this.email ? this.email : "", Validators.required],
      status: [this.status],
    });
  }

  getUserById(userId: number) {
    this.userService.getUserById(userId).subscribe((response) => {
      this.user = Object.assign({}, response.data);
      this.id = this.user.id;
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.passwordHash = this.user.passwordHash;
      this.passwordSalt = this.user.passwordSalt;
      this.email = this.user.email;
      this.status = this.user.status;
      this.createUserUpdateForm();
    });
  }

  update() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      this.userService.update(userModel).subscribe(
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
