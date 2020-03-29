import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 *  PRIMENG
 */

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
  ]
})
export class ShareModule { }
