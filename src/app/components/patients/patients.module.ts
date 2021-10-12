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

const routes: Routes = [
  {
    path: "",
    component: PatientListComponent,
  },
  {
    path: "add",
    component: PatientAddComponent,
  },
  {
    path: "update/:patientId",
    component: PatientUpdateComponent,
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
