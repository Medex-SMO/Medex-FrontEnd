import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudyListComponent } from "./study-list/study-list.component";
import { RouterModule, Routes } from "@angular/router";
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StudyAddComponent } from "./study-add/study-add.component";
import { StudyUpdateComponent } from "./study-update/study-update.component";
import { PopupModule } from "../popup/popup.module";
import { RoleGuard } from "src/app/guards/role.guard";

const routes: Routes = [
  {
    path: "",
    component: StudyListComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["superuser"],
    },
  },
  {
    path: "add",
    component: StudyAddComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["study.add", "superuser"],
    },
  },
  {
    path: "update/:studyId",
    component: StudyUpdateComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["study.update", "superuser"],
    },
  },
];

@NgModule({
  declarations: [StudyListComponent, StudyAddComponent, StudyUpdateComponent],
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
export class StudiesModule {}
