import { AddStudyComponent } from "./../popup/add/add-study/add-study.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DataTablesModule } from "angular-datatables";
import { FeahterIconModule } from "../../core/feather-icon/feather-icon.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SiteListComponent } from "./site-list/site-list.component";
import { SiteAddComponent } from "./site-add/site-add.component";
import { SiteUpdateComponent } from "./site-update/site-update.component";
import { PopupModule } from "../popup/popup.module";
import { RoleGuard } from "src/app/guards/role.guard";

const routes: Routes = [
  {
    path: "",
    component: SiteListComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["superuser","sitecoordinator"],
    },
  },
  {
    path: "add",
    component: SiteAddComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["site.add", "superuser"],
    },
  },
  {
    path: "update/:siteId",
    component: SiteUpdateComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["site.update", "superuser","sitecoordinator"],
    },
  },
];

@NgModule({
  declarations: [SiteListComponent, SiteAddComponent, SiteUpdateComponent],
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
export class SitesModule {}
