import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStockComponent } from './list-stock/list-stock.component';
import { DetailsStockComponent } from './details-stock/details-stock.component';
import { FromStockComponent } from './from-stock/from-stock.component';


const routes: Routes = [
  {
    path: '',
    component: ListStockComponent
  },
  {
    path: ':id/details',
    component: DetailsStockComponent
  },
  {
    path: ':id/form',
  component: FromStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
