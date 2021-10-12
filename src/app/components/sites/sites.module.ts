import { AddStudyComponent } from './../popup/add/add-study/add-study.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DataTablesModule } from "angular-datatables";
import { FeahterIconModule } from "../../core/feather-icon/feather-icon.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SiteListComponent } from "./site-list/site-list.component";
import { SiteAddComponent } from "./site-add/site-add.component";
import { SiteUpdateComponent } from "./site-update/site-update.component";
import { PopupModule } from '../popup/popup.module';

const routes: Routes = [
  {
    path: "",
    component: SiteListComponent,
  },
  {
    path: "add",
    component: SiteAddComponent,
  },
  {
    path: "update/:siteId",
    component: SiteUpdateComponent,
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
    PopupModule
  ],
})
export class SitesModule {}
