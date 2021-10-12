import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { Site } from 'src/app/models/site';
import { Sponsor } from 'src/app/models/sponsor';
import { Study } from 'src/app/models/study';
import { PatientService } from 'src/app/services/patient.service';
import { SiteService } from 'src/app/services/site.service';
import { SponsorService } from 'src/app/services/sponsor.service';
import { StudyService } from 'src/app/services/study.service';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
    closeModal: string;
    studies: Study[];
    sponsors: Sponsor[];
    sites: Site[];
    patientAddForm: FormGroup;

    sponsorId: number;
    studyId: number;

    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private siteService: SiteService,
        private studyService: StudyService,
        private sponsorService: SponsorService,
        private patientService: PatientService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.getSponsors();
        this.createPatientAddForm();
    }

    selectedSponsor() {
        this.sponsorId = this.patientAddForm.controls['sponsorId'].value;
        this.getStudiesBySponsorId(this.sponsorId);
    }

    selectedStudy() {
        this.studyId = this.patientAddForm.controls['studyId'].value;
        this.getSitesByStudyId(this.studyId);
    }

    createPatientAddForm() {
        this.patientAddForm = this.formBuilder.group({
            sponsorId: ['', Validators.required],
            studyId: ['', Validators.required],
            siteId: ['', Validators.required],
            no: ['', Validators.required]
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

    triggerModal(content) {
        this.modalService
            .open(content, {ariaLabelledBy: 'modal-basic-title'})
            .result.then(
                (res) => {
                    this.closeModal = `Closed with: ${res}`;

                    if (this.patientAddForm.valid) {
                        let patientModel = Object.assign(
                            {},
                            this.patientAddForm.value
                        );
                        this.patientService.add(patientModel).subscribe(
                            (response) => {
                                this.toastrService.success(
                                    response.message,
                                    'Success'
                                );
                                window.location.reload();
                            },
                            (responseError) => {
                                if (responseError.error.Errors.length > 0) {
                                    for (
                                        let i = 0;
                                        i < responseError.error.Errors.length;
                                        i++
                                    ) {
                                        this.toastrService.error(
                                            responseError.error.Errors[i]
                                                .ErrorMessage,
                                            'Validation Error'
                                        );
                                    }
                                }
                            }
                        );
                    } else {
                        this.toastrService.warning(
                            'Form is not valid',
                            'Warning'
                        );
                    }
                },
                (res) => {
                    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
                }
            );
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
