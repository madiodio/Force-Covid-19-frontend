import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListBeneficiaireComponent } from './components/beneficiaires/list-beneficiaire/list-beneficiaire.component';
import { DetailsBeneficiaireComponent } from './components/beneficiaires/details-beneficiaire/details-beneficiaire.component';
import { FormBeneficiaireComponent } from './components/beneficiaires/form-beneficiaire/form-beneficiaire.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ListStockComponent } from './components/stocks/list-stock/list-stock.component';
import { DetailsStockComponent } from './components/stocks/details-stock/details-stock.component';
import { FromStockComponent } from './components/stocks/from-stock/from-stock.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
	{
		path: 'stocks',
    loadChildren: './components/stocks/stocks.module#StocksModule'
  },
	{
		path: 'beneficiaires',
    loadChildren: './components/beneficiaires/beneficiaires.module#BeneficiairesModule'
  },
	{
		path: 'distributeurs',
    loadChildren: './components/distributeurs/distributeurs.module#DistributeursModule'
  },
  {
    path: 'utilisateurs',
    loadChildren: './components/utilisateurs/utilisateurs.module#UtilisateursModule'
  },
  {
    path: 'allocations',
    loadChildren: './components/allocations/allocations.module#AllocationsModule'
  },
  {
    path: 'livreurs',
    loadChildren: './components/livreurs/livreurs.module#LivreursModule'
  },
  {
    path: 'biens',
    loadChildren: './components/biens/biens.module#BiensModule'
  }
    //]//,
	//	canActivate: [AuthGuardService]
//	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
