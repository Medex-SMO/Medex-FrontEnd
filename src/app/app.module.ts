import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";

import { LayoutModule } from "./views/layout/layout.module";

import { AppComponent } from "./app.component";
import { ErrorPageComponent } from "./views/pages/error-page/error-page.component";

import { HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { DataTablesModule } from "angular-datatables";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { DeleteSponsorComponent } from './components/popup/delete/delete-sponsor/delete-sponsor.component';
import { DeleteStudyComponent } from './components/popup/delete/delete-study/delete-study.component';
import { DeleteAssignmentComponent } from './components/popup/delete/delete-assignment/delete-assignment.component';
import { DeleteEquipmentComponent } from './components/popup/delete/delete-equipment/delete-equipment.component';
import { DeletePatientComponent } from './components/popup/delete/delete-patient/delete-patient.component';
import { DeleteSiteComponent } from './components/popup/delete/delete-site/delete-site.component';
import { DeleteUserComponent } from './components/popup/delete/delete-user/delete-user.component';
import { DeleteVisitComponent } from './components/popup/delete/delete-visit/delete-visit.component';
import { AddPatientComponent } from './components/popup/add/add-patient/add-patient.component';
import { AddSiteComponent } from './components/popup/add/add-site/add-site.component';
import { AddSponsorComponent } from './components/popup/add/add-sponsor/add-sponsor.component';
import { AddStudyComponent } from './components/popup/add/add-study/add-study.component';

@NgModule({
  declarations: [AppComponent, ErrorPageComponent, DeleteSponsorComponent, DeleteStudyComponent, DeleteAssignmentComponent, DeleteEquipmentComponent, DeletePatientComponent, DeleteSiteComponent, DeleteUserComponent, DeleteVisitComponent, AddPatientComponent, AddSiteComponent, AddSponsorComponent, AddStudyComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    DataTablesModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import("highlight.js/lib/core"),
        languages: {
          xml: () => import("highlight.js/lib/languages/xml"),
          typescript: () => import("highlight.js/lib/languages/typescript"),
          scss: () => import("highlight.js/lib/languages/scss"),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
