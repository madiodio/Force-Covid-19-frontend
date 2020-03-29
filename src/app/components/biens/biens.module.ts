import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBienComponent } from './form-bien/form-bien.component';
import { ListBienComponent } from './list-bien/list-bien.component';
import { DetailsBienComponent } from './details-bien/details-bien.component';
import { BiensRoutingModule } from './biens-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';



@NgModule({
  declarations: [
    FormBienComponent,
    ListBienComponent,
    DetailsBienComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    BiensRoutingModule
  ]
})
export class BiensModule { }
