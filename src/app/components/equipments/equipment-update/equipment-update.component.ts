import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Equipment } from "src/app/models/equipment";
import { User } from "src/app/models/user";
import { EquipmentService } from "src/app/services/equipment.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-equipment-update",
  templateUrl: "./equipment-update.component.html",
  styleUrls: ["./equipment-update.component.scss"],
})
export class EquipmentUpdateComponent implements OnInit {
  equipmentUpdateForm: FormGroup;
  equipment: Equipment;
  users: User[];

  id: number;
  userId: number;
  name: string;
  serialNo: string;
  amount: string;

  clicked = false;

  constructor(
    private equipmentService: EquipmentService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["equipmentId"]) {
        this.id = params["equipmentId"];
        this.getEquipmentById(params["equipmentId"]);
        this.createEquipmentUpdateForm();
      }
    });
    this.getUsers();
  }

  createEquipmentUpdateForm() {
    this.equipmentUpdateForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      userId: [this.userId ? this.userId : "", Validators.required],
      name: [this.name ? this.name : "", Validators.required],
      serialNo: [this.serialNo ? this.serialNo : "", Validators.required],
      amount: [this.amount ? this.amount : "", Validators.required],
    });
  }

  getUsers() {
    this.userService
      .get()
      .subscribe((response) => (this.users = response.data));
  }

  getEquipmentById(equipmentId: number) {
    this.equipmentService
      .getEquipmentById(equipmentId)
      .subscribe((response) => {
        this.equipment = Object.assign({}, response.data);
        this.id = this.equipment.id;
        this.userId = this.equipment.userId;
        this.name = this.equipment.name;
        this.serialNo = this.equipment.serialNo;
        this.amount = this.equipment.amount;
        this.createEquipmentUpdateForm();
      });
  }

  update() {
    if (this.equipmentUpdateForm.valid) {
      let equipmentModel = Object.assign({}, this.equipmentUpdateForm.value);
      this.equipmentService.update(equipmentModel).subscribe(
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
    } else {
      this.toastrService.warning("Form is not valid", "Warning");
    }
  }
}
