import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/models/user";

@Component({
  selector: "app-delete-user",
  templateUrl: "./delete-user.component.html",
  styleUrls: ["./delete-user.component.scss"],
})
export class DeleteUserComponent implements OnInit {
  user: User;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
