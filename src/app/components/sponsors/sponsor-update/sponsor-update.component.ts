import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Sponsor } from "src/app/models/sponsor";
import { SponsorService } from "src/app/services/sponsor.service";

@Component({
  selector: "app-sponsor-update",
  templateUrl: "./sponsor-update.component.html",
  styleUrls: ["./sponsor-update.component.scss"],
})
export class SponsorUpdateComponent implements OnInit {
  sponsorUpdateForm: FormGroup;
  sponsor: Sponsor;

  id: number;
  name: string;

  clicked = false;

  constructor(
    private sponsorService: SponsorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["sponsorId"]) {
        this.id = params["sponsorId"];
        this.getSponsorById(params["sponsorId"]);
        this.createSponsorUpdateForm();
      }
    });
  }

  createSponsorUpdateForm() {
    this.sponsorUpdateForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      name: [this.name ? this.name : "", Validators.required],
    });
  }

  getSponsorById(sponsorId: number) {
    this.sponsorService.getSponsorById(sponsorId).subscribe((response) => {
      this.sponsor = Object.assign({}, response.data);
      this.id = this.sponsor.id;
      this.name = this.sponsor.name;
      this.createSponsorUpdateForm();
    });
  }

  update() {
    if (this.sponsorUpdateForm.valid) {
      let sponsorModel = Object.assign({}, this.sponsorUpdateForm.value);
      this.sponsorService.update(sponsorModel).subscribe(
        (response) => {
          this.clicked = true;
          this.toastrService.success(response.message, "Success");
          this.router.navigate(["/sponsors"]);
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
    else {
      this.toastrService.warning("Form is not valid", "Warning");
    }
  }
}
