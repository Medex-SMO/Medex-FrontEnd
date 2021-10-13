import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/models/user";
import { EquipmentService } from "src/app/services/equipment.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-equipment-add",
  templateUrl: "./equipment-add.component.html",
  styleUrls: ["./equipment-add.component.scss"],
})
export class EquipmentAddComponent implements OnInit {
  users: User[];
  equipmentAddForm: FormGroup;

  clicked = false;

  constructor(
    private formBuilder: FormBuilder,
    private equipmentService: EquipmentService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.createEquipmentAddForm();
  }

  createEquipmentAddForm() {
    this.equipmentAddForm = this.formBuilder.group({
      userId: ["", Validators.required],
      name: ["", Validators.required],
      serialNo: ["", Validators.required],
      amount: ["", Validators.required],
    });
  }

  getUsers() {
    this.userService
      .get()
      .subscribe((response) => (this.users = response.data));
  }

  add() {
    let equipmentModel = Object.assign({}, this.equipmentAddForm.value);
    this.equipmentService.add(equipmentModel).subscribe(
      (response) => {
        this.clicked = true;
        this.toastrService.success(response.message, "Success");
        this.router.navigate(["/equipments"]);
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
}
