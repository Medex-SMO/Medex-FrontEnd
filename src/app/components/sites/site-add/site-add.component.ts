import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { City } from "src/app/models/city";
import { Sponsor } from "src/app/models/sponsor";
import { Study } from "src/app/models/study";
import { CityService } from "src/app/services/city.service";
import { SiteService } from "src/app/services/site.service";
import { SponsorService } from "src/app/services/sponsor.service";
import { StudyService } from "src/app/services/study.service";

@Component({
  selector: "app-site-add",
  templateUrl: "./site-add.component.html",
  styleUrls: ["./site-add.component.scss"],
})
export class SiteAddComponent implements OnInit {
  studies: Study[];
  sponsors: Sponsor[];
  cities: City[];
  siteAddForm: FormGroup;

  sponsorId: number;
  studyId: number;

  clicked = false;

  constructor(
    private formBuilder: FormBuilder,
    private siteService: SiteService,
    private studyService: StudyService,
    private sponsorService: SponsorService,
    private cityService: CityService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSponsors();
    this.createSiteAddForm();
  }

  selectedSponsor() {
    this.sponsorId = this.siteAddForm.controls["sponsorId"].value;
    this.getStudiesBySponsorId(this.sponsorId);
  }

  selectedStudy() {
    this.studyId = this.siteAddForm.controls["studyId"].value;
    this.getCities();
  }

  createSiteAddForm() {
    this.siteAddForm = this.formBuilder.group({
      sponsorId: ["", Validators.required],
      studyId: ["", Validators.required],
      cityId: ["", Validators.required],
      siteNumber: ["", Validators.required],
      siteName: ["", Validators.required],
      department: ["", Validators.required],
      investigator: ["", Validators.required],
      craName: ["", Validators.required],
      craMail: ["", Validators.email],
      craMobile: ["", Validators.required],
    });
  }

  getSponsors() {
    this.sponsorService
      .get()
      .subscribe((response) => (this.sponsors = response.data));
  }

  getCities() {
    this.cityService
      .get()
      .subscribe((response) => (this.cities = response.data));
  }

  getStudiesBySponsorId(sponsorId: number) {
    this.studyService
      .getStudiesBySponsor(sponsorId)
      .subscribe((response) => (this.studies = response.data));
  }

  add() {
    let siteModel = Object.assign({}, this.siteAddForm.value);
    this.siteService.add(siteModel).subscribe(
      (response) => {
        this.clicked = true;
        this.toastrService.success(response.message, "Success");
        this.router.navigate(["/sites"]);
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
