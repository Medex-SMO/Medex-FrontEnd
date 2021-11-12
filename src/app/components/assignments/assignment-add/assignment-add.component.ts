import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Site } from "src/app/models/site";
import { Sponsor } from "src/app/models/sponsor";
import { Study } from "src/app/models/study";
import { User } from "src/app/models/user";
import { AssignmentService } from "src/app/services/assignment.service";
import { SiteService } from "src/app/services/site.service";
import { SponsorService } from "src/app/services/sponsor.service";
import { StudyService } from "src/app/services/study.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-assignment-add",
  templateUrl: "./assignment-add.component.html",
  styleUrls: ["./assignment-add.component.scss"],
})
export class AssignmentAddComponent implements OnInit {
  studies: Study[];
  sites: Site[];
  users: User[];

  sponsors: Sponsor[];

  sponsorId: number;
  studyId: number;

  assignmentAddForm: FormGroup;

  clicked = false;

  constructor(
    private formBuilder: FormBuilder,
    private assignmentService: AssignmentService,
    private siteService: SiteService,
    private studyService: StudyService,
    private sponsorService: SponsorService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getSponsors();
    this.createAssignmentAddForm();
  }

  selectedSponsor() {
    this.sponsorId = this.assignmentAddForm.controls["sponsorId"].value;
    this.getStudiesBySponsorId(this.sponsorId);
  }

  selectedStudy() {
    this.studyId = this.assignmentAddForm.controls["studyId"].value;
    this.getSitesByStudyId(this.studyId);
  }

  createAssignmentAddForm() {
    this.assignmentAddForm = this.formBuilder.group({
      sponsorId: ["", Validators.required],
      studyId: ["", Validators.required],
      siteId: ["", Validators.required],
      userId: ["", Validators.required],
      status: ["", Validators.required],
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

  getUsers() {
    this.userService
      .get()
      .subscribe((response) => (this.users = response.data));
  }

  add() {
    let assignmentModel = Object.assign({}, this.assignmentAddForm.value);
    this.assignmentService.add(assignmentModel).subscribe(
      (response) => {
        this.clicked = true;
        this.toastrService.success(response.message, "Success");
        this.router.navigate(["/assignments"]);
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
