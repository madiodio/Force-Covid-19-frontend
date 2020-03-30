import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBeneficiaireComponent } from './list-beneficiaire/list-beneficiaire.component';
import { DetailsBeneficiaireComponent } from './details-beneficiaire/details-beneficiaire.component';
import { FormBeneficiaireComponent } from './form-beneficiaire/form-beneficiaire.component';


const routes: Routes = [
  {
    path: '',
    component: ListBeneficiaireComponent
  },
  {
    path: ':id/details',
    component: DetailsBeneficiaireComponent,
  },
  {
    path: ':id/form',
    component: FormBeneficiaireComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiaireRoutingModule { }
