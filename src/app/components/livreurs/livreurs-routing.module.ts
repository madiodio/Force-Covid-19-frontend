import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListLivreurComponent } from './list-livreur/list-livreur.component';
import { DetailsLivreurComponent } from './details-livreur/details-livreur.component';
import { FromLivreurComponent } from './from-livreur/from-livreur.component';


const routes: Routes = [
  {
    path: '',
    component: ListLivreurComponent
  },
  {
    path: ':id/details',
    component: DetailsLivreurComponent
  },
  {
    path: ':id/form',
  component: FromLivreurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivreursRoutingModule { }
