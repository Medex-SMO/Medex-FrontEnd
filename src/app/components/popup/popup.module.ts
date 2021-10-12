import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddPatientComponent } from "./add/add-patient/add-patient.component";
import { AddSiteComponent } from "./add/add-site/add-site.component";
import { AddStudyComponent } from "./add/add-study/add-study.component";
import { AddSponsorComponent } from "./add/add-sponsor/add-sponsor.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AddSponsorComponent,
    AddStudyComponent,
    AddSiteComponent,
    AddPatientComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    AddSponsorComponent,
    AddStudyComponent,
    AddSiteComponent,
    AddPatientComponent,
  ],
})
export class PopupModule {}
