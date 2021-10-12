import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipment } from 'src/app/models/equipment';

@Component({
  selector: 'app-delete-equipment',
  templateUrl: './delete-equipment.component.html',
  styleUrls: ['./delete-equipment.component.scss']
})
export class DeleteEquipmentComponent implements OnInit {
  equipment: Equipment

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}