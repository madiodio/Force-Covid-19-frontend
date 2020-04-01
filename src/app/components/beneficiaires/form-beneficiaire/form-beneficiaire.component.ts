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
  beneficiaire: Beneficiaire;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  
  constructor(private beneficiaireService: BeneficiaireService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      lastname: [''],
      firstname: [''],
      pieceDIdentite: [''],
      phoneNumber: [''],
      email: [''],
    });

    if(this.id){
      this.onGetBeneficiaire(this.id);
    } else {
      this.beneficiaire = new Beneficiaire();
    }
  }

  onGetBeneficiaire(id: string){
    this.beneficiaireService.getBeneficiaire(id).then(
      (result: Beneficiaire)=>{
        this.beneficiaire=result;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
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
    this.beneficiaire = null;
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

}
