import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "./user-list/user-list.component";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserUpdateComponent } from "./user-update/user-update.component";
import { RouterModule, Routes } from "@angular/router";
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PopupModule } from "../popup/popup.module";
import { RoleGuard } from "src/app/guards/role.guard";
import { UserRoleUpdateComponent } from './user-role-update/user-role-update.component';

const routes: Routes = [
  {
    path: "",
    component: UserListComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["superuser"],
    },
  },
  {
    path: "add",
    component: UserAddComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["user.add", "superuser"],
    },
  },
  {
    path: "update/:userId",
    component: UserUpdateComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["user.update", "superuser"],
    },
  },
  {
    path: "roleupdate/:userId",
    component: UserRoleUpdateComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ["user.roleupdate", "superuser"],
    },
  },
];

@NgModule({
  declarations: [UserListComponent, UserAddComponent, UserUpdateComponent, UserRoleUpdateComponent],
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
export class UsersModule {}
