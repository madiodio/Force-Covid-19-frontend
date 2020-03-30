import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapWidgetComponent } from './map-widget/map-widget.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MapComponent, MapWidgetComponent
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    MapComponent, MapWidgetComponent
  ]
})
export class MapModule { }
