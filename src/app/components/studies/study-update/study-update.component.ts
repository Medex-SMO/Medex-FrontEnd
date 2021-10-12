import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Sponsor } from "src/app/models/sponsor";
import { Study } from "src/app/models/study";
import { SponsorService } from "src/app/services/sponsor.service";
import { StudyService } from "src/app/services/study.service";

@Component({
  selector: "app-study-update",
  templateUrl: "./study-update.component.html",
  styleUrls: ["./study-update.component.scss"],
})
export class StudyUpdateComponent implements OnInit {
  studyUpdateForm: FormGroup;
  study: Study;
  sponsors: Sponsor[];

  id: number;
  sponsorId: number;
  protocolCode: string;
  studyName: string;
  indication: string;

  clicked = false;

  constructor(
    private studyService: StudyService,
    private sponsorService: SponsorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["studyId"]) {
        this.id = params["studyId"];
        this.getStudyById(params["studyId"]);
        this.createStudyUpdateForm();
      }
    });
    this.getSponsors();
  }

  createStudyUpdateForm() {
    this.studyUpdateForm = this.formBuilder.group({
      id: [this.id ? this.id : "", Validators.required],
      sponsorId: [this.sponsorId ? this.sponsorId : "", Validators.required],
      protocolCode: [
        this.protocolCode ? this.protocolCode : "",
        Validators.required,
      ],
      studyName: [this.studyName ? this.studyName : "", Validators.required],
      indication: [this.indication ? this.indication : "", Validators.required],
    });
  }

  getSponsors() {
    this.sponsorService
      .get()
      .subscribe((response) => (this.sponsors = response.data));
  }

  getStudyById(studyId: number) {
    this.studyService.getStudyById(studyId).subscribe((response) => {
      this.study = Object.assign({}, response.data);
      this.id = this.study.id;
      this.sponsorId = this.study.sponsorId;
      this.protocolCode = this.study.protocolCode;
      this.studyName = this.study.studyName;
      this.indication = this.study.indication;
      this.createStudyUpdateForm();
    });
  }

  update() {
    if (this.studyUpdateForm.valid) {
      let studyModel = Object.assign({}, this.studyUpdateForm.value);
      this.studyService.update(studyModel).subscribe(
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
    } else {
      this.toastrService.warning("Form is not valid", "Warning");
    }
  }
}
