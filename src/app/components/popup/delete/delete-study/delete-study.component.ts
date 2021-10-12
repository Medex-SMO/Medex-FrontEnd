import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Study } from "src/app/models/study";

@Component({
  selector: "app-delete-study",
  templateUrl: "./delete-study.component.html",
  styleUrls: ["./delete-study.component.scss"],
})
export class DeleteStudyComponent implements OnInit {
  study: Study;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
