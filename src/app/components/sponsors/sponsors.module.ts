import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SponsorListComponent } from "./sponsor-list/sponsor-list.component";
import { DataTablesModule } from "angular-datatables";
import { FeahterIconModule } from "../../core/feather-icon/feather-icon.module";
import { SponsorAddComponent } from "./sponsor-add/sponsor-add.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SponsorUpdateComponent } from "./sponsor-update/sponsor-update.component";
import { RoleGuard } from "src/app/guards/role.guard";

const routes: Routes = [
  {
    path: "",
    component: SponsorListComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["superuser"],
    },
  },
  {
    path: "add",
    component: SponsorAddComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["sponsor.add", "superuser"],
    },
  },
  {
    path: "update/:sponsorId",
    component: SponsorUpdateComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["sponsor.update", "superuser"],
    },
  },
];

@NgModule({
  declarations: [
    SponsorListComponent,
    SponsorAddComponent,
    SponsorUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SponsorsModule {}
