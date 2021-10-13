import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Visit } from "src/app/models/visit";
import { VisitModel } from "src/app/models/visitModel";
import { VisitService } from "src/app/services/visit.service";
import { DeleteVisitComponent } from "../../popup/delete/delete-visit/delete-visit.component";

@Component({
  selector: "app-visit-list",
  templateUrl: "./visit-list.component.html",
  styleUrls: ["./visit-list.component.scss"],
})
export class VisitListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  visits: VisitModel[];
  constructor(
    private visitService: VisitService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.getVisitsDetail();
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
            columns: [0, 1, 2, 3, 4],
          },
        },
        {
          extend: "print",
          className: "table-button button btn btn-success",
          exportOptions: {
            columns: [0, 1, 2, 3, 4],
          },
        },
        /* {
          extend: "copy",
          className: "table-button button btn btn-success",
          exportOptions: {
            columns: [0, 1, 2, 3, 4],
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
          visit: function (e, dt, node, config) {
            alert("Button activated");
          },
        }, */
      ],
    };
  }

  getVisitsDetail() {
    this.visitService.getVisitsDetails().subscribe((response) => {
      this.visits = response.data;
      this.dtTrigger.next();
    });
  }

  delete(visit: Visit) {
    const ref = this.modalService.open(DeleteVisitComponent);
    ref.componentInstance.visit = visit;

    ref.result.then(
      (yes) => {
        this.visitService.delete(visit).subscribe(
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
      this.getVisitsDetail();
    });
  }
}
