import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { BeneficiaireService } from '../../../services/beneficiaire.service';
import { Beneficiaire } from 'src/app/models/beneficiaire';



@Component({
  selector: 'app-form-beneficiaire',
  templateUrl: './form-beneficiaire.component.html',
  styleUrls: ['./form-beneficiaire.component.css']
})
export class FormBeneficiaireComponent implements OnInit {
  form: FormGroup;
  @Input() display: boolean;
  @Input() beneficiaire: Beneficiaire;

  @Output() displayChange = new EventEmitter();


  constructor(private beneficiaireService: BeneficiaireService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      lastname: [''],
      firstname: [''],
      pieceDIdentite: [''],
      phoneNumber: [''],
      email: [''],
    });
  }

  showDialog() {
    this.display = true;
  }

  onSubmit() {
    if (this.beneficiaire) {
      console.log("Update");
      console.log(this.beneficiaire);
      this.beneficiaire = null;
    } else {
      console.log("New")
    }
    // this.beneficiaireService.addBeneficiaire(this.form.value);
  }

  onDialogHide() {
    this.displayChange.emit(false);
    this.beneficiaire = null;
  }

  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

}
