import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataTableDirective} from 'angular-datatables';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import { Sponsor } from 'src/app/models/sponsor';
import { SponsorService } from 'src/app/services/sponsor.service';
import { DeleteSponsorComponent } from '../../popup/delete/delete-sponsor/delete-sponsor.component';

@Component({
    selector: 'app-sponsor-list',
    templateUrl: './sponsor-list.component.html',
    styleUrls: ['./sponsor-list.component.scss']
})
export class SponsorListComponent implements OnInit, OnDestroy {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;

    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject<any>();

    sponsors: Sponsor[];
    constructor(
        private sponsorService: SponsorService,
        private toastrService: ToastrService,
        private modalService: NgbModal
    ) {}
    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    ngOnInit(): void {
        this.getSponsors();
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
                        columns: [0]
                    }
                },
                {
                    extend: 'print',
                    className: 'table-button button btn btn-success',
                    exportOptions: {
                        columns: [0]
                    }
                }/* ,
                {
                    extend: 'copy',
                    className: 'table-button button btn btn-success',
                    exportOptions: {
                        columns: [0]
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

    getSponsors() {
        this.sponsorService.get().subscribe((response) => {
            this.sponsors = response.data;
            this.dtTrigger.next();
        });
    }

    delete(sponsor: Sponsor) {
        const ref = this.modalService.open(DeleteSponsorComponent);
        ref.componentInstance.sponsor = sponsor;

        ref.result.then(
            (yes) => {
                this.sponsorService.delete(sponsor).subscribe(
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
            this.getSponsors();
        });
    }
}
