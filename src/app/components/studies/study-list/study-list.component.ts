import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataTableDirective} from 'angular-datatables';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import { Study } from 'src/app/models/study';
import { StudyModel } from 'src/app/models/studyModel';
import { StudyService } from 'src/app/services/study.service';
import { DeleteStudyComponent } from '../../popup/delete/delete-study/delete-study.component';

@Component({
    selector: 'app-study-list',
    templateUrl: './study-list.component.html',
    styleUrls: ['./study-list.component.scss']
})
export class StudyListComponent implements OnInit, OnDestroy {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;

    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject<any>();

    studies: StudyModel[];
    constructor(
        private studyService: StudyService,
        private toastrService: ToastrService,
        private modalService: NgbModal
    ) {}
    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    ngOnInit(): void {
        this.getStudiesDetails();
        this.dtOptions = {
            dom: 'Bfrtip',
            initComplete: function (settings, json) {
                $('.button').removeClass('dt-button');
            },
            buttons: [
                {
                    extend: 'excel',
                    filename: 'MedexDosyaAdı',
                    text: "Excel",
                    title: 'MedexTitle',
                    excelStyles: {
                        template: 'blue_medium'
                    },
                    message: 'MedexMessage',
                    className: 'table-button button btn btn-success',
                    exportOptions: {
                        columns: [0, 1, 2, 3]
                    }
                },
                {
                    extend: 'print',
                    className: 'table-button button btn btn-success',
                    exportOptions: {
                        columns: [0, 1, 2, 3]
                    }
                },
                /* {
                    extend: 'copy',
                    className: 'table-button button btn btn-success',
                    exportOptions: {
                        columns: [0, 1, 2, 3]
                    }
                },
                {
                    extend: 'colvis',
                    className: 'table-button button btn btn-success'
                },
                {
                    text: 'Some button',
                    className: 'table-button button btn btn-success',
                    key: '1',
                    action: function (e, dt, node, config) {
                        alert('Button activated');
                    }
                } */
            ]
        };
    }

    getStudiesDetails() {
        this.studyService.getStudiesDetails().subscribe((response) => {
            this.studies = response.data;
            this.dtTrigger.next();
        });
    }

    delete(study: Study) {
        const ref = this.modalService.open(DeleteStudyComponent);
        ref.componentInstance.study = study;

        ref.result.then(
            (yes) => {
                this.studyService.delete(study).subscribe(
                    (response) => {
                        this.toastrService.success(response.message, 'Success');
                        this.rerender();
                    },
                    (responseError) => {
                        this.toastrService.error(
                            responseError.error.Message,
                            responseError.error.StatusCode
                        );
                    }
                );
            },
            (cancel) => {
                this.toastrService.info('Deletion canceled', 'Canceled');
            }
        );
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.getStudiesDetails();
        });
    }
}
