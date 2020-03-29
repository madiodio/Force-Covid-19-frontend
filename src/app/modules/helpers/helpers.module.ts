import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageWidgetComponent } from './file/image-widget/image-widget.component';
import { ImageUploaderComponent } from './file/image-uploader/image-uploader.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImageUploaderComponent, ImageWidgetComponent
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ImageUploaderComponent, ImageWidgetComponent
  ]
})

export class HelpersModule { }
