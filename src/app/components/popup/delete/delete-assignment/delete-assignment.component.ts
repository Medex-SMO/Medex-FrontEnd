import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Assignment } from "src/app/models/assignment";

@Component({
  selector: "app-delete-assignment",
  templateUrl: "./delete-assignment.component.html",
  styleUrls: ["./delete-assignment.component.scss"],
})
export class DeleteAssignmentComponent implements OnInit {
  assignment: Assignment;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
