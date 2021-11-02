import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Patient } from "src/app/models/patient";
import { Site } from "src/app/models/site";
import { Sponsor } from "src/app/models/sponsor";
import { Study } from "src/app/models/study";
import { AuthService } from "src/app/services/auth.service";
import { PatientService } from "src/app/services/patient.service";
import { SiteService } from "src/app/services/site.service";
import { SponsorService } from "src/app/services/sponsor.service";
import { StudyService } from "src/app/services/study.service";
import { VisitService } from "src/app/services/visit.service";

@Component({
  selector: "app-visit-add",
  templateUrl: "./visit-add.component.html",
  styleUrls: ["./visit-add.component.scss"],
})
export class VisitAddComponent implements OnInit {
  patients: Patient[];
  visitAddForm: FormGroup;

  studies: Study[];
  sites: Site[];

  sponsors: Sponsor[];

  sponsorId: number;
  studyId: number;
  siteId: number;

  clicked = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private visitService: VisitService,
    private patientService: PatientService,
    private siteService: SiteService,
    private studyService: StudyService,
    private sponsorService: SponsorService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSponsors();
    this.createVisitAddForm();
  }

  selectedSponsor() {
    this.sponsorId = this.visitAddForm.controls["sponsorId"].value;
    this.getStudiesBySponsorId(this.sponsorId);
  }

  selectedStudy() {
    this.studyId = this.visitAddForm.controls["studyId"].value;
    this.getSitesByStudyId(this.studyId);
  }

  selectedSite() {
    this.siteId = this.visitAddForm.controls["siteId"].value;
    this.getPatientsBySiteId(this.siteId);
  }

  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  createVisitAddForm() {
    this.visitAddForm = this.formBuilder.group({
      sponsorId: ["", Validators.required],
      studyId: ["", Validators.required],
      siteId: ["", Validators.required],
      patientId: ["", Validators.required],
      visitNo: ["", Validators.required],
      timeSpent: ["", Validators.required],
      description: ["", Validators.required],
      visitDate: ["",Validators.required],
      userId: [this.authService.currentUserId],
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

  getPatientsBySiteId(siteId: number) {
    this.patientService
      .getPatientsBySite(siteId)
      .subscribe((response) => (this.patients = response.data));
  }

  onDateSelect(event) {
    let year = event.year;
    let month = event.month <= 9 ? "0" + event.month : event.month;
    let day = event.day <= 9 ? "0" + event.day : event.day;
    let finalDate = year + "-" + month + "-" + day;
    this.visitAddForm.controls["visitDate"].setValue(finalDate);
  }

  add() {
    let visitModel = Object.assign({}, this.visitAddForm.value);
    console.log(visitModel);
    this.visitService.add(visitModel).subscribe(
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
  }
}
