import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Patient } from "src/app/models/patient";
import { SiteModel } from "src/app/models/siteModel";
import { PatientService } from "src/app/services/patient.service";
import { SiteService } from "src/app/services/site.service";

@Component({
  selector: "app-patient-update",
  templateUrl: "./patient-update.component.html",
  styleUrls: ["./patient-update.component.scss"],
})
export class PatientUpdateComponent implements OnInit {
  patientUpdateForm: FormGroup;
  patient: Patient;
  sites: SiteModel[];

  id: number;
  siteId: number;
  subjectNo: string;

  clicked = false;

  constructor(
    private patientService: PatientService,
    private siteService: SiteService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["patientId"]) {
        this.id = params["patientId"];
        this.getPatientById(params["patientId"]);
        this.createPatientUpdateForm();
      }
    });
    this.getSitesDetails();
  }

  createPatientUpdateForm() {
    this.patientUpdateForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      siteId: [this.siteId ? this.siteId : "", Validators.required],
      subjectNo: [this.subjectNo ? this.subjectNo : "", Validators.required],
    });
  }

  getSitesDetails() {
    this.siteService
      .getSitesDetails()
      .subscribe((response) => (this.sites = response.data));
  }

  getPatientById(patientId: number) {
    this.patientService.getPatientById(patientId).subscribe((response) => {
      this.patient = Object.assign({}, response.data);
      this.id = this.patient.id;
      this.siteId = this.patient.siteId;
      this.subjectNo = this.patient.subjectNo;
      this.createPatientUpdateForm();
    });
  }

  update() {
    if (this.patientUpdateForm.valid) {
      let patientModel = Object.assign({}, this.patientUpdateForm.value);
      this.patientService.update(patientModel).subscribe(
        (response) => {
          this.clicked = true;
          this.toastrService.success(response.message, "Success");
          this.router.navigate(["/patients"]);
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
