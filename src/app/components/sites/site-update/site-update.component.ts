import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { City } from "src/app/models/city";
import { Site } from "src/app/models/site";
import { Study } from "src/app/models/study";
import { CityService } from "src/app/services/city.service";
import { SiteService } from "src/app/services/site.service";
import { StudyService } from "src/app/services/study.service";

@Component({
  selector: "app-site-update",
  templateUrl: "./site-update.component.html",
  styleUrls: ["./site-update.component.scss"],
})
export class SiteUpdateComponent implements OnInit {
  siteUpdateForm: FormGroup;
  site: Site;
  studies: Study[];
  cities: City[];

  id: number;
  studyId: number;
  cityId: number;
  siteNumber: string;
  siteName: string;
  department: string;
  investigator: string;
  craName: string;
  craMail: string;
  craMobile: string;

  clicked = false;

  constructor(
    private siteService: SiteService,
    private studyService: StudyService,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["siteId"]) {
        this.id = params["siteId"];
        this.getSiteById(params["siteId"]);
        this.createSiteUpdateForm();
      }
    });
    this.getStudies();
    this.getCities();
  }

  createSiteUpdateForm() {
    this.siteUpdateForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      studyId: [this.studyId ? this.studyId : "", Validators.required],
      cityId: [this.cityId ? this.cityId : "", Validators.required],
      siteNumber: [this.siteNumber ? this.siteNumber : "", Validators.required],
      siteName: [this.siteName ? this.siteName : "", Validators.required],
      department: [this.department ? this.department : "", Validators.required],
      investigator: [
        this.investigator ? this.investigator : "",
        Validators.required,
      ],
      craName: [this.craName ? this.craName : "", Validators.required],
      craMail: [this.craMail ? this.craMail : "", Validators.required],
      craMobile: [this.craMobile ? this.craMobile : "", Validators.required],
    });
  }
  getStudies() {
    this.studyService
      .get()
      .subscribe((response) => (this.studies = response.data));
  }

  getCities() {
    this.cityService
      .get()
      .subscribe((response) => (this.cities = response.data));
  }

  getSiteById(siteId: number) {
    this.siteService.getSiteById(siteId).subscribe((response) => {
      this.site = Object.assign({}, response.data);
      this.id = this.site.id;
      this.cityId = this.site.cityId;
      this.studyId = this.site.studyId;
      this.siteNumber = this.site.siteNumber;
      this.siteName = this.site.siteName;
      this.department = this.site.department;
      this.investigator = this.site.investigator;
      this.craName = this.site.craName;
      this.craMail = this.site.craMail;
      this.craMobile = this.site.craMobile;
      this.createSiteUpdateForm();
    });
  }

  update() {
    if (this.siteUpdateForm.valid) {
      let siteModel = Object.assign({}, this.siteUpdateForm.value);
      this.siteService.update(siteModel).subscribe(
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
    } else {
      this.toastrService.warning("Form is not valid", "Warning");
    }
  }
}
