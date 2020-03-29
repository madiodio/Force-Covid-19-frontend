import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBeneficiaireComponent } from './list-beneficiaire/list-beneficiaire.component';
import { FormBeneficiaireComponent } from './form-beneficiaire/form-beneficiaire.component';
import { DetailsBeneficiaireComponent } from './details-beneficiaire/details-beneficiaire.component';
import { BeneficiaireRoutingModule } from './beneficiaire-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';



@NgModule({
  declarations: [
    ListBeneficiaireComponent,
    DetailsBeneficiaireComponent,
    FormBeneficiaireComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    BeneficiaireRoutingModule
  ]
})
export class BeneficiairesModule { }
