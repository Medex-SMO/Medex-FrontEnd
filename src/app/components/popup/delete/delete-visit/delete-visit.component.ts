import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { VisitModel } from "src/app/models/visitModel";

@Component({
  selector: "app-delete-visit",
  templateUrl: "./delete-visit.component.html",
  styleUrls: ["./delete-visit.component.scss"],
})
export class DeleteVisitComponent implements OnInit {
  visit: VisitModel;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
