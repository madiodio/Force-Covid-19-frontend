import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { BeneficiaireService } from '../../../services/beneficiaire.service';
import { Beneficiaire } from 'src/app/models/beneficiaire';



@Component({
  selector: 'app-details-beneficiaire',
  templateUrl: './details-beneficiaire.component.html',
  styleUrls: ['./details-beneficiaire.component.css']
})
export class DetailsBeneficiaireComponent implements OnInit {
  form: FormGroup;
  @Input() display: boolean;
  @Input() beneficiaire: Beneficiaire;
  @Output() displayChange = new EventEmitter();


  constructor(private beneficiaireService: BeneficiaireService, private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  onDialogHide() {
    this.beneficiaire = null;
    this.displayChange.emit(false);
  }
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

}
