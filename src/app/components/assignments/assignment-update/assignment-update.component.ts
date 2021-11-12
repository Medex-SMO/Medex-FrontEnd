import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Assignment } from "src/app/models/assignment";
import { Site } from "src/app/models/site";
import { User } from "src/app/models/user";
import { AssignmentService } from "src/app/services/assignment.service";
import { SiteService } from "src/app/services/site.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-assignment-update",
  templateUrl: "./assignment-update.component.html",
  styleUrls: ["./assignment-update.component.scss"],
})
export class AssignmentUpdateComponent implements OnInit {
  assignmentUpdateForm: FormGroup;
  assignment: Assignment;
  sites: Site[];
  users: User[];

  id: number;
  siteId: number;
  userId: number;
  status: boolean;

  clicked = false;

  constructor(
    private assignmentService: AssignmentService,
    private siteService: SiteService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["assignmentId"]) {
        this.id = params["assignmentId"];
        this.getAssignmentById(params["assignmentId"]);
        this.createAssignmentUpdateForm();
      }
    });
    this.getSites();
    this.getUsers();
  }

  createAssignmentUpdateForm() {
    this.assignmentUpdateForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      siteId: [this.siteId ? this.siteId : "", Validators.required],
      userId: [this.userId ? this.userId : "", Validators.required],
      status: [this.status],
    });
  }

  getSites() {
    this.siteService
      .get()
      .subscribe((response) => (this.sites = response.data));
  }

  getUsers() {
    this.userService
      .get()
      .subscribe((response) => (this.users = response.data));
  }

  getAssignmentById(assignmentId: number) {
    this.assignmentService
      .getAssignmentById(assignmentId)
      .subscribe((response) => {
        this.assignment = Object.assign({}, response.data);
        this.id = this.assignment.id;
        this.siteId = this.assignment.siteId;
        this.userId = this.assignment.userId;
        this.status = this.assignment.status;
        this.createAssignmentUpdateForm();
      });
  }

  update() {
    if (this.assignmentUpdateForm.valid) {
      let assignmentModel = Object.assign({}, this.assignmentUpdateForm.value);
      this.assignmentService.update(assignmentModel).subscribe(
        (response) => {
          this.clicked = true;
          this.toastrService.success(response.message, "Success");
          this.router.navigate(["/assignments"]);
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
  }
}
