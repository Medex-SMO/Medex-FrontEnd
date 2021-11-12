import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Site } from "src/app/models/site";
import { SiteModel } from "src/app/models/siteModel";
import { SiteService } from "src/app/services/site.service";
import { DeleteSiteComponent } from "../../popup/delete/delete-site/delete-site.component";

@Component({
  selector: "app-site-list",
  templateUrl: "./site-list.component.html",
  styleUrls: ["./site-list.component.scss"],
})
export class SiteListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  sites: SiteModel[];

  isSiteCoordinator:boolean=false
  constructor(
    private siteService: SiteService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    if (this.authService.currentRoles == "superuser") {
      this.getSitesDetail();
      this.isSiteCoordinator = false
    } else {
      this.getSitesDetailByUserId(this.authService.currentUserId)
      this.isSiteCoordinator = true
    }
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
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        },
        {
          extend: "print",
          className: "table-button button btn btn-success",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        } /* ,
        {
          extend: "copy",
          className: "table-button button btn btn-success",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
        }, */,
      ],
    };

  }

  getSitesDetail() {
    this.siteService.getSitesDetails().subscribe((response) => {
      this.sites = response.data;
      this.dtTrigger.next();
    });
  }

  getSitesDetailByUserId(userId: number) {
    this.siteService.getSitesDetailByUserId(userId).subscribe((response) => {
      this.sites = response.data;
      this.dtTrigger.next();
    });
  }

  delete(site: Site) {
    const ref = this.modalService.open(DeleteSiteComponent);
    ref.componentInstance.site = site;

    ref.result.then(
      (yes) => {
        this.siteService.delete(site).subscribe(
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
      this.getSitesDetail();
    });
  }
}
