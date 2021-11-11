import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PatientListComponent } from "./patient-list/patient-list.component";
import { PatientAddComponent } from "./patient-add/patient-add.component";
import { PatientUpdateComponent } from "./patient-update/patient-update.component";
import { RouterModule, Routes } from "@angular/router";
import { DataTablesModule } from "angular-datatables";
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PopupModule } from "../popup/popup.module";
import { RoleGuard } from "src/app/guards/role.guard";

const routes: Routes = [
  {
    path: "",
    component: PatientListComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["superuser", "sitecoordinator"],
    },
  },
  {
    path: "add",
    component: PatientAddComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["patient.add", "superuser", "sitecoordinator"],
    },
  },
  {
    path: "update/:patientId",
    component: PatientUpdateComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["patient.update", "superuser", "sitecoordinator"],
    },
  },
];

@NgModule({
  declarations: [
    PatientListComponent,
    PatientAddComponent,
    PatientUpdateComponent,
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
export class PatientsModule {}
