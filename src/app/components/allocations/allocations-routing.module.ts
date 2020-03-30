import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAllocationComponent } from './list-allocation/list-allocation.component';
import { DetailsAllocationComponent } from './details-allocation/details-allocation.component';
import { FormAllocationComponent } from './form-allocation/form-allocation.component';


const routes: Routes = [
  {
    path: '',
    component: ListAllocationComponent
  },
  {
    path: ':id/details',
    component: DetailsAllocationComponent,
  },
  {
    path: ':id/form',
  component: FormAllocationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllicationsRoutingModule { }
