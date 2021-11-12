import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Site } from "src/app/models/site";
import { Sponsor } from "src/app/models/sponsor";
import { Study } from "src/app/models/study";
import { PatientService } from "src/app/services/patient.service";
import { SiteService } from "src/app/services/site.service";
import { SponsorService } from "src/app/services/sponsor.service";
import { StudyService } from "src/app/services/study.service";

@Component({
  selector: "app-patient-add",
  templateUrl: "./patient-add.component.html",
  styleUrls: ["./patient-add.component.scss"],
})
export class PatientAddComponent implements OnInit {
  studies: Study[];
  sites: Site[];
  patientAddForm: FormGroup;

  sponsors: Sponsor[];

  sponsorId: number;
  studyId: number;

  clicked = false;

  isSiteCoordinator:boolean=false
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private siteService: SiteService,
    private studyService: StudyService,
    private sponsorService: SponsorService,
    private patientService: PatientService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.currentRoles == "superuser") {
      this.isSiteCoordinator = false
    } else {
      this.isSiteCoordinator = true
    }

    this.getSponsors();
    this.createPatientAddForm();
  }

  selectedSponsor() {
    this.sponsorId = this.patientAddForm.controls["sponsorId"].value;
    this.getStudiesBySponsorId(this.sponsorId);
  }

  selectedStudy() {
    this.studyId = this.patientAddForm.controls["studyId"].value;
    this.getSitesByStudyId(this.studyId);
  }

  createPatientAddForm() {
    this.patientAddForm = this.formBuilder.group({
      sponsorId: ["", Validators.required],
      studyId: ["", Validators.required],
      siteId: ["", Validators.required],
      subjectNo: ["", Validators.required],
    });
  }

  getSponsors() {
    this.sponsorService
      .get()
      .subscribe((response) => (this.sponsors = response.data));
  }

  getStudiesBySponsorId(sponsorId: number) {
    this.studyService
      .getStudiesBySponsor(sponsorId)
      .subscribe((response) => (this.studies = response.data));
  }

  getSitesByStudyId(studyId: number) {
    this.siteService
      .getSitesByStudy(studyId)
      .subscribe((response) => (this.sites = response.data));
  }

  add() {
    let patientModel = Object.assign({}, this.patientAddForm.value);
    this.patientService.add(patientModel).subscribe(
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
  }
}
