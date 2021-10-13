import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { DeleteUserComponent } from "../../popup/delete/delete-user/delete-user.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  users: User[] = [];
  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsers();
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

  getUsers() {
    this.userService.get().subscribe((response) => {
      this.users = response.data;
      this.dtTrigger.next();
    });
  }

  delete(user: User) {
    const ref = this.modalService.open(DeleteUserComponent);
    ref.componentInstance.user = user;

    ref.result.then(
      (yes) => {
        this.userService.delete(user).subscribe(
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
      this.getUsers();
    });
  }
}
