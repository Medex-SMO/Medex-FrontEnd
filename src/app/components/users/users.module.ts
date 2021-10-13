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

const routes: Routes = [
  {
    path: "",
    component: UserListComponent,
  },
  {
    path: "add",
    component: UserAddComponent,
  },
  {
    path: "update/:userId",
    component: UserUpdateComponent,
  },
];

@NgModule({
  declarations: [UserListComponent, UserAddComponent, UserUpdateComponent],
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
