import { SiteService } from 'src/app/services/site.service';
import { StudyService } from 'src/app/services/study.service';
import { SponsorService } from 'src/app/services/sponsor.service';
import { PatientModel } from './../../../models/patientModel';
import { AssignmentModel } from './../../../models/assignmentModel';
import { Assignment } from 'src/app/models/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';
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
import { VisitService } from "src/app/services/visit.service";

@Component({
  selector: "app-visit-add",
  templateUrl: "./visit-add.component.html",
  styleUrls: ["./visit-add.component.scss"],
})
export class VisitAddComponent implements OnInit {
  patients: PatientModel[];
  visitAddForm: FormGroup;

  studies: Study[];
  sites: Site[];

  sponsors: Sponsor[];

  assignments: AssignmentModel[];
  assignments1: AssignmentModel[];
  assignments2: AssignmentModel[];

  sponsorName: string;
  protocolCode: string;
  siteNumber: string;

  sponsor: Sponsor
  study: Study
  site: Site

  clicked = false;

  isSiteCoordinator:boolean=false
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sponsorService: SponsorService,
    private studyService: StudyService,
    private siteService: SiteService,
    private visitService: VisitService,
    private patientService: PatientService,
    private assignmentService: AssignmentService,
    private toastrService: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getSponsorsByUserId(this.authService.currentUserId)
    this.createVisitAddForm();

    if (this.authService.currentRoles == "superuser") {
      this.isSiteCoordinator = false
    } else {
      this.isSiteCoordinator = true
    }
  }

  selectedSponsor() {
    this.sponsorName = this.visitAddForm.controls["sponsorName"].value;
    this.getSponsorsByUserIdAndSponsorName(this.authService.currentUserId,this.sponsorName);
    this.sponsorService.getSponsorByName(this.sponsorName).subscribe((response) =>{
      this.sponsor = response.data
    })
  }

  selectedStudy() {
    this.protocolCode = this.visitAddForm.controls["protocolCode"].value;
    this.getSponsorsByUserIdAndSponsorNameAndProtocolCode(this.authService.currentUserId,this.sponsorName,this.protocolCode);
    this.studyService.getStudyByProtocolCode(this.protocolCode).subscribe((response) => {
      this.study = response.data
    })
  }

  selectedSite() {
    this.siteNumber = this.visitAddForm.controls["siteNumber"].value;
    this.getPatientsBySiteNumber(this.siteNumber);
    this.siteService.getSiteBySiteNumber(this.siteNumber).subscribe((response) => {
      this.site = response.data
    })
  }

  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  createVisitAddForm() {
    this.visitAddForm = this.formBuilder.group({
      sponsorName: ["", Validators.required],
      protocolCode: ["", Validators.required],
      siteNumber: ["", Validators.required],
      patientId: ["", Validators.required],
      visitNo: ["", Validators.required],
      timeSpent: ["", Validators.required],
      description: ["", Validators.required],
      visitDate: ["",Validators.required],
      userId: [this.authService.currentUserId],
    });
  }

  getSponsorsByUserId(userId: number) {
    this.assignmentService
      .getSponsorsByUserId(userId)
      .subscribe((response) => (this.assignments = response.data));
  }

  getSponsorsByUserIdAndSponsorName(userId: number, sponsorName: string) {
    this.assignmentService.getSponsorsByUserIdAndSponsorName(userId, sponsorName)
      .subscribe((response) => (this.assignments1 = response.data));
  }

  getSponsorsByUserIdAndSponsorNameAndProtocolCode(userId: number, sponsorName: string, protocolCode: string) {
    this.assignmentService
      .getSponsorsByUserIdAndSponsorNameAndProtocolCode(userId,sponsorName,protocolCode)
      .subscribe((response) => (this.assignments2 = response.data));
  }

  getPatientsBySiteNumber(siteNumber: string) {
    this.patientService
      .getPatientsBySiteNumber(siteNumber)
      .subscribe((response) => {
        this.patients = response.data
      });
  }

  onDateSelect(event) {
    let year = event.year;
    let month = event.month <= 9 ? "0" + event.month : event.month;
    let day = event.day <= 9 ? "0" + event.day : event.day;
    let finalDate = year + "-" + month + "-" + day;
    this.visitAddForm.controls["visitDate"].setValue(finalDate);
  }

  add() {
    this.visitAddForm.addControl("sponsorId",this.fb.control(this.sponsor.id))
    this.visitAddForm.addControl("studyId",this.fb.control(this.study.id))
    this.visitAddForm.addControl("siteId",this.fb.control(this.site.id))
    let visitModel = Object.assign({}, this.visitAddForm.value);
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
