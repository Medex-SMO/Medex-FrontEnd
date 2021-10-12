import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Sponsor } from "src/app/models/sponsor";
import { SponsorService } from "src/app/services/sponsor.service";
import { StudyService } from "src/app/services/study.service";

@Component({
  selector: "app-study-add",
  templateUrl: "./study-add.component.html",
  styleUrls: ["./study-add.component.scss"],
})
export class StudyAddComponent implements OnInit {
  sponsors: Sponsor[];
  studyAddForm: FormGroup;

  clicked = false;

  constructor(
    private formBuilder: FormBuilder,
    private studyService: StudyService,
    private sponsorService: SponsorService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createStudyAddForm();
    this.getSponsors();
  }

  createStudyAddForm() {
    this.studyAddForm = this.formBuilder.group({
      sponsorId: ["", Validators.required],
      protocolCode: ["", Validators.required],
      studyName: ["", Validators.required],
      indication: ["", Validators.required],
    });
  }

  getSponsors() {
    this.sponsorService
      .get()
      .subscribe((response) => (this.sponsors = response.data));
  }

  add() {
    let studyModel = Object.assign({}, this.studyAddForm.value);
    this.studyService.add(studyModel).subscribe(
      (response) => {
        this.clicked = true;
        this.toastrService.success(response.message, "Success");
        this.router.navigate(["/studies"]);
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
