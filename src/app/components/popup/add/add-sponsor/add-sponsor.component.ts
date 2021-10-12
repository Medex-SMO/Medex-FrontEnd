import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SponsorService } from "src/app/services/sponsor.service";

@Component({
  selector: "app-add-sponsor",
  templateUrl: "./add-sponsor.component.html",
  styleUrls: ["./add-sponsor.component.scss"],
})
export class AddSponsorComponent implements OnInit {
  closeModal: string;
  sponsorAddForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private sponsorService: SponsorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createSponsorAddForm();
  }

  createSponsorAddForm() {
    this.sponsorAddForm = this.formBuilder.group({
      name: ["", Validators.required],
    });
  }

  triggerModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;

          if (this.sponsorAddForm.valid) {
            let sponsorModel = Object.assign({}, this.sponsorAddForm.value);
            this.sponsorService.add(sponsorModel).subscribe(
              (response) => {
                this.toastrService.success(response.message, "Success");
                window.location.reload();
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
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
