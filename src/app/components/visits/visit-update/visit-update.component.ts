import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Patient } from "src/app/models/patient";
import { Visit } from "src/app/models/visit";
import { PatientService } from "src/app/services/patient.service";
import { VisitService } from "src/app/services/visit.service";

@Component({
  selector: "app-visit-update",
  templateUrl: "./visit-update.component.html",
  styleUrls: ["./visit-update.component.scss"],
})
export class VisitUpdateComponent implements OnInit {
  visitUpdateForm: FormGroup;
  visit: Visit;
  patients: Patient[];

  id: number;
  patientId: number;
  visitNo: string;
  visitDate: Date;
  timeSpent: number;
  description: string;

  clicked = false;

  constructor(
    private visitService: VisitService,
    private patientService: PatientService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["visitId"]) {
        this.id = params["visitId"];
        this.getVisitById(params["visitId"]);
        this.createVisitUpdateForm();
      }
    });
    this.getPatients();
  }

  createVisitUpdateForm() {
    this.visitUpdateForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      patientId: [this.patientId ? this.patientId : ""],
      visitNo: [this.visitNo ? this.visitNo : ""],
      visitDate: [this.visitDate ? this.visitDate : ""],
      timeSpent: [this.timeSpent ? this.timeSpent : ""],
      description: [this.description ? this.description : ""],
    });
  }

  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  getPatients() {
    this.patientService
      .get()
      .subscribe((response) => (this.patients = response.data));
  }

  getVisitById(visitId: number) {
    this.visitService.getVisitById(visitId).subscribe((response) => {
      this.visit = Object.assign({}, response.data);
      this.id = this.visit.id;
      this.patientId = this.visit.patientId;
      this.visitNo = this.visit.visitNo;
      this.visitDate = this.visit.visitDate
      this.timeSpent = this.visit.timeSpent;
      this.description = this.visit.description;
      this.createVisitUpdateForm();
    });
  }

  update() {
    if (this.visitUpdateForm.valid) {
      let visitModel = Object.assign({}, this.visitUpdateForm.value);
      this.visitService.update(visitModel).subscribe(
        (response) => {
          this.clicked = true;
          this.toastrService.success(response.message, "Success");
          this.router.navigate(["/visits"]);
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
