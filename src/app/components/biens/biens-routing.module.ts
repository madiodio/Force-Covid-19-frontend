import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBienComponent } from './list-bien/list-bien.component';
import { DetailsBienComponent } from './details-bien/details-bien.component';
import { FormBienComponent } from './form-bien/form-bien.component';


const routes: Routes = [
  {
    path: '',
    component: ListBienComponent
  },
  {
    path: ':id/details',
    component: DetailsBienComponent
  },
  {
    path: ':id/form',
  component: FormBienComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiensRoutingModule { }
