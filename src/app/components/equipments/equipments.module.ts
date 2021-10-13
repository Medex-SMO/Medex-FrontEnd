import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentAddComponent } from './equipment-add/equipment-add.component';
import { EquipmentUpdateComponent } from './equipment-update/equipment-update.component';
import { RouterModule, Routes } from '@angular/router';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { DataTablesModule } from 'angular-datatables';
import { PopupModule } from '../popup/popup.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    component: EquipmentListComponent,
  },
  {
    path: "add",
    component: EquipmentAddComponent,
  },
  {
    path: "update/:equipmentId",
    component: EquipmentUpdateComponent,
  },
];

@NgModule({
  declarations: [EquipmentListComponent, EquipmentAddComponent, EquipmentUpdateComponent],
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
export class EquipmentsModule { }
