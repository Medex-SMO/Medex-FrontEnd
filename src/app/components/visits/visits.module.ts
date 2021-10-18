import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VisitListComponent } from "./visit-list/visit-list.component";
import { VisitAddComponent } from "./visit-add/visit-add.component";
import { VisitUpdateComponent } from "./visit-update/visit-update.component";
import { RouterModule, Routes } from "@angular/router";
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { PopupModule } from "../popup/popup.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { RoleGuard } from "src/app/guards/role.guard";

const routes: Routes = [
  {
    path: "",
    component: VisitListComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["superuser","sitecoordinator"],
    },
  },
  {
    path: "add",
    component: VisitAddComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["visit.add", "superuser","sitecoordinator"],
    },
  },
  {
    path: "update/:visitId",
    component: VisitUpdateComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["visit.update", "superuser","sitecoordinator"],
    },
  },
];

@NgModule({
  declarations: [VisitListComponent, VisitAddComponent, VisitUpdateComponent],
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
export class VisitsModule {}
