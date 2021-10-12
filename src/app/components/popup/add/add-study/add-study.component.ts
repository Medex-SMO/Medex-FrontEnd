import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Sponsor } from "src/app/models/sponsor";
import { SponsorService } from "src/app/services/sponsor.service";
import { StudyService } from "src/app/services/study.service";

@Component({
  selector: "app-add-study",
  templateUrl: "./add-study.component.html",
  styleUrls: ["./add-study.component.scss"],
})
export class AddStudyComponent implements OnInit {
  closeModal: string;
  sponsors: Sponsor[];
  studyAddForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private studyService: StudyService,
    private sponsorService: SponsorService,
    private toastrService: ToastrService
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

  triggerModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;

          if (this.studyAddForm.valid) {
            let studyModel = Object.assign({}, this.studyAddForm.value);
            this.studyService.add(studyModel).subscribe(
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
