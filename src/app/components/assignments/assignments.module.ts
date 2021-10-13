import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { AssignmentAddComponent } from './assignment-add/assignment-add.component';
import { AssignmentUpdateComponent } from './assignment-update/assignment-update.component';
import { RouterModule, Routes } from '@angular/router';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { PopupModule } from '../popup/popup.module';

const routes: Routes = [
  {
    path: "",
    component: AssignmentListComponent,
  },
  {
    path: "add",
    component: AssignmentAddComponent,
  },
  {
    path: "update/:assignmentId",
    component: AssignmentUpdateComponent,
  },
];

@NgModule({
  declarations: [AssignmentListComponent, AssignmentAddComponent, AssignmentUpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    PopupModule
  ]
})
export class AssignmentsModule { }
