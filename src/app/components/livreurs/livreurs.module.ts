import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromLivreurComponent } from './from-livreur/from-livreur.component';
import { ListLivreurComponent } from './list-livreur/list-livreur.component';
import { DetailsLivreurComponent } from './details-livreur/details-livreur.component';
import { LivreursRoutingModule } from './livreurs-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';



@NgModule({
  declarations: [
    FromLivreurComponent,
    ListLivreurComponent,
    DetailsLivreurComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    LivreursRoutingModule
  ]
})
export class LivreursModule { }
