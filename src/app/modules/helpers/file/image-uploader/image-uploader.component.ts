import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { File } from '../file';
import { FileService } from '../file.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css'],
  providers: [GlobalService, FileService]
})
export class ImageUploaderComponent implements OnInit, OnChanges {

  @Input() elementId = '';
  @Input() eventId = '';
  @Input() value: File[];
  @Input() multiple: boolean;
  @Input() label: string;
  @Input() description: string;
  @Input() limit = 1;
  @Output() onUpload = new EventEmitter<File>();
  @Output() onDelete = new EventEmitter<File>();
  @ViewChild('fileInput', { static: false }) fileInput;

  uploading = false;

  files: File[] = [];
  photo: File = new File();
  images = [];
  errorMessage: string = null;
  didSetValue = false;

  constructor(private glService: GlobalService, private fileService: FileService) { }

  ngOnInit() {
    //this.comment.eventId = this.eventId;
  }

  ngOnChanges() {

    if (this.value && this.value.length && this.value[0] && !this.didSetValue) {

      this.files = this.value;
      this.didSetValue = true;
    }
  }

  getFileUrl(name) {
    return this.fileService.getFileUrl(name);
  }

  onDeleteFile(index) {

    const file = this.files[index];
    if (file) {
      this.files.splice(index, 1);
    }
  }


  onFileChange(input) {

    this.uploading = true;
    const fi = this.fileInput.nativeElement;

    if (fi.files && fi.files[0]) {

      for (const fileToUpload of fi.files) {


        const validation = this.fileService.validateFile(fileToUpload);
        if (!validation) {
          this.errorMessage = 'File type is not valid or too large.';
          input.value = null;
          this.fileInput.nativeElement.value = null;
          this.uploading = false;

        } else {

          this.fileService.upload(fileToUpload).subscribe(file => {

            this.uploading = false;

            this.files.push(file);
            this.onUpload.emit(file);
            input.value = null;
            this.fileInput.nativeElement.value = null;

          }, err => {
            console.log(err);
            this.uploading = false;
            this.errorMessage = 'Unable upload file.';
            input.value = null;
            this.fileInput.nativeElement.value = null;
          });
        }

      }

    }

  }

}
