import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '../file';
import { FileService } from '../file.service';
import { GlobalService } from 'src/app/global.service';

declare const $: any;

@Component({
  selector: 'app-image-widget',
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.css'],
  providers: [FileService]
})

export class ImageWidgetComponent implements OnInit {

  @Input() files: File[];
  photos: File[];
  imageElement: any;
  constructor(
    private glService: GlobalService,
    private fileService: FileService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('je suis le ImageWidgetComponent');
  }

  ngOnChanges() {
    console.log('je suis le ImageWidgetComponent change! ')
    if (this.files && this.files.length && this.files[0]) {

      this.photos = this.files;
    }
  }

  getFileUrl(name) {
    return this.fileService.getFileUrl(name);
  }

  refreshView() {
  }

}
