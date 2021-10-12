import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Sponsor } from "src/app/models/sponsor";

@Component({
  selector: "app-delete-sponsor",
  templateUrl: "./delete-sponsor.component.html",
  styleUrls: ["./delete-sponsor.component.scss"],
})
export class DeleteSponsorComponent implements OnInit {
  sponsor: Sponsor;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
