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
  beneficiaire: Beneficiaire;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  
  constructor(private beneficiaireService: BeneficiaireService) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetBeneficiaire(this.id);
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

  onDialogHide() {
    this.beneficiaire = null;
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

}
