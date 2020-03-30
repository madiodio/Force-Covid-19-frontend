import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDistributeurComponent } from './list-distributeur/list-distributeur.component';
import { DetailsDistributeurComponent } from './details-distributeur/details-distributeur.component';
import { FromDistributeurComponent } from './from-distributeur/from-distributeur.component';
import { DistributeursRoutingModule } from './distributeurs-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';



@NgModule({
  declarations: [
    ListDistributeurComponent,
    DetailsDistributeurComponent,
    FromDistributeurComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DistributeursRoutingModule
  ]
})
export class DistributeursModule { }
