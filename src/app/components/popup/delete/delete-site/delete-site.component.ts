import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-delete-site',
  templateUrl: './delete-site.component.html',
  styleUrls: ['./delete-site.component.scss']
})
export class DeleteSiteComponent implements OnInit {
  site: Site

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
