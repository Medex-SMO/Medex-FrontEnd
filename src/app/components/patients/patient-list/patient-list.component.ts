import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Patient } from "src/app/models/patient";
import { PatientModel } from "src/app/models/patientModel";
import { PatientService } from "src/app/services/patient.service";
import { DeletePatientComponent } from "../../popup/delete/delete-patient/delete-patient.component";

@Component({
  selector: "app-patient-list",
  templateUrl: "./patient-list.component.html",
  styleUrls: ["./patient-list.component.scss"],
})
export class PatientListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  patients: PatientModel[];
  constructor(
    private patientService: PatientService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.getPatientsDetail();
    this.dtOptions = {
      dom: "Bfrtip",
      initComplete: function (settings, json) {
        $(".button").removeClass("dt-button");
      },
      buttons: [
        {
          extend: "excel",
          filename: "MedexDosyaAdı",
          text: "Excel",
          title: "MedexTitle",
          excelStyles: {
            template: "blue_medium",
          },
          message: "MedexMessage",
          className: "table-button button btn btn-success",
          exportOptions: {
            columns: [0, 1, 2, 3],
          },
        },
        {
          extend: "print",
          className: "table-button button btn btn-success",
          exportOptions: {
            columns: [0, 1, 2, 3],
          },
        },
        /* {
          extend: "copy",
          className: "table-button button btn btn-success",
          exportOptions: {
            columns: [0, 1, 2, 3],
          },
        },
        {
          extend: "colvis",
          className: "table-button button btn btn-success",
        },
        {
          text: "Some button",
          className: "table-button button btn btn-success",
          key: "1",
          action: function (e, dt, node, config) {
            alert("Button activated");
          },
        }, */
      ],
    };
  }

  getPatientsDetail() {
    this.patientService.getPatientsDetails().subscribe((response) => {
      this.patients = response.data;
      this.dtTrigger.next();
    });
  }

  delete(patient: Patient) {
    const ref = this.modalService.open(DeletePatientComponent);
    ref.componentInstance.patient = patient;

    ref.result.then(
      (yes) => {
        this.patientService.delete(patient).subscribe(
          (response) => {
            this.toastrService.success(response.message, "Success");
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
        this.toastrService.info("Deletion canceled", "Canceled");
      }
    );
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getPatientsDetail();
    });
  }
}
