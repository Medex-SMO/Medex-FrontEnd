import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssignmentListComponent } from "./assignment-list/assignment-list.component";
import { AssignmentAddComponent } from "./assignment-add/assignment-add.component";
import { AssignmentUpdateComponent } from "./assignment-update/assignment-update.component";
import { RouterModule, Routes } from "@angular/router";
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { PopupModule } from "../popup/popup.module";
import { RoleGuard } from "src/app/guards/role.guard";

const routes: Routes = [
  {
    path: "",
    component: AssignmentListComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["superuser"],
    },
  },
  {
    path: "add",
    component: AssignmentAddComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["assignment.add", "superuser"],
    },
  },
  {
    path: "update/:assignmentId",
    component: AssignmentUpdateComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["assignment.update", "superuser"],
    },
  },
];

@NgModule({
  declarations: [
    AssignmentListComponent,
    AssignmentAddComponent,
    AssignmentUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    PopupModule,
  ],
})
export class AssignmentsModule {}
