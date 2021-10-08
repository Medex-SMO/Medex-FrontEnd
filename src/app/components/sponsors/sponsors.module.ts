import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SponsorListComponent } from './sponsor-list/sponsor-list.component';
import { DataTablesModule } from 'angular-datatables';

import { FeahterIconModule } from '../../core/feather-icon/feather-icon.module';

const routes: Routes = [
  {
    path: '',
    component: SponsorListComponent/* ,
    children: [
      {
        path: '',
        redirectTo: 'cropper',
        pathMatch: 'full'
      },
      {
        path: 'cropper',
        component: ImageCropperComponent
      },
      {
        path: 'owl-carousel',
        component: OwlCarouselComponent
      },
      {
        path: 'sweet-alert',
        component: SweetAlertComponent
      }
    ] */
  }
]

@NgModule({
  declarations: [SponsorListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    DataTablesModule
  ]
})
export class SponsorsModule { }
