import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SponsorService } from "src/app/services/sponsor.service";

@Component({
  selector: "app-sponsor-add",
  templateUrl: "./sponsor-add.component.html",
  styleUrls: ["./sponsor-add.component.scss"],
})
export class SponsorAddComponent implements OnInit {
  sponsorAddForm: FormGroup;

  clicked = false;

  constructor(
    private formBuilder: FormBuilder,
    private sponsorService: SponsorService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createSponsorAddForm();
  }

  createSponsorAddForm() {
    this.sponsorAddForm = this.formBuilder.group({
      name: ["", Validators.required],
    });
  }
  add() {
    let sponsorModel = Object.assign({}, this.sponsorAddForm.value);
    this.sponsorService.add(sponsorModel).subscribe(
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
}
