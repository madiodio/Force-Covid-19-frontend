import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { BeneficiaireService } from '../../../services/beneficiaire.service';


@Component({
  selector: 'app-form-beneficiaire',
  templateUrl: './form-beneficiaire.component.html',
  styleUrls: ['./form-beneficiaire.component.css']
})
export class FormBeneficiaireComponent implements OnInit {
  display: boolean = false;
  form: FormGroup;


  constructor(private beneficiaireService: BeneficiaireService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      lastname: [''],
      firstname: [''],
      pieceDIdentite: [''],
      phoneNumber: [''],
      email: [''],
      role: [''],
    });
  }

  showDialog() {
    this.display = true;
  }

  onSubmit() {
    console.log((this.form.value))
    // this.beneficiaireService.addBeneficiaire(this.form.value);
  }

}
