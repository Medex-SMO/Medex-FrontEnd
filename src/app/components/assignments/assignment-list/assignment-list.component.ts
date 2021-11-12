import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Assignment } from "src/app/models/assignment";
import { AssignmentModel } from "src/app/models/assignmentModel";
import { AssignmentService } from "src/app/services/assignment.service";
import { DeleteAssignmentComponent } from "../../popup/delete/delete-assignment/delete-assignment.component";

@Component({
  selector: "app-assignment-list",
  templateUrl: "./assignment-list.component.html",
  styleUrls: ["./assignment-list.component.scss"],
})
export class AssignmentListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  assignments: AssignmentModel[];
  constructor(
    private assignmentService: AssignmentService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.getAssignmentsDetail();
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
            columns: [0, 1, 2],
          },
        },
        {
          extend: "print",
          className: "table-button button btn btn-success",
          exportOptions: {
            columns: [0, 1, 2],
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

  getAssignmentsDetail() {
    this.assignmentService.getAssignmentsDetails().subscribe((response) => {
      this.assignments = response.data;
      this.dtTrigger.next();
    });
  }

  delete(assignment: Assignment) {
    const ref = this.modalService.open(DeleteAssignmentComponent);
    ref.componentInstance.assignment = assignment;

    ref.result.then(
      (yes) => {
        this.assignmentService.delete(assignment).subscribe(
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
      this.getAssignmentsDetail();
    });
  }
}
