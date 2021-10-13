import { DeleteEquipmentComponent } from "./../../popup/delete/delete-equipment/delete-equipment.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { EquipmentModel } from "src/app/models/equipmentModel";
import { EquipmentService } from "src/app/services/equipment.service";
import { Equipment } from "src/app/models/equipment";

@Component({
  selector: "app-equipment-list",
  templateUrl: "./equipment-list.component.html",
  styleUrls: ["./equipment-list.component.scss"],
})
export class EquipmentListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  equipments: EquipmentModel[];
  constructor(
    private equipmentService: EquipmentService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.getEquipmentsDetail();
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

  getEquipmentsDetail() {
    this.equipmentService.getEquipmentsDetails().subscribe((response) => {
      this.equipments = response.data;
      this.dtTrigger.next();
    });
  }

  delete(equipment: Equipment) {
    const ref = this.modalService.open(DeleteEquipmentComponent);
    ref.componentInstance.equipment = equipment;

    ref.result.then(
      (yes) => {
        this.equipmentService.delete(equipment).subscribe(
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
      this.getEquipmentsDetail();
    });
  }
}
