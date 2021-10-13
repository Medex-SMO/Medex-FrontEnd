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

const routes: Routes = [
  {
    path: "",
    component: VisitListComponent,
  },
  {
    path: "add",
    component: VisitAddComponent,
  },
  {
    path: "update/:visitId",
    component: VisitUpdateComponent,
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
