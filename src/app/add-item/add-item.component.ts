import { Component, OnInit } from '@angular/core';
import { FiletypeService } from '../filetype.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fileitem } from '../Fileitem';
import { FileToUpload } from '../fileToUpload';

@Component({
  selector: 'app-add-fileitem',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AdditemComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  file : Observable<any>;
  listOfFileHeaders: Observable<any>;

    constructor(private uploadService:FiletypeService) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event){
    this.selectedFiles = event.target.files;
  }

  upload(){
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          if(this.progress == 100){
            
          }} else if (event instanceof HttpResponse){
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
      },
      err => {
          this.progress = 0;
          this.message = 'Could n ot upload the file!';
          this.currentFile = undefined;
      });
      this.selectedFiles = undefined;
  }

  private mdlSampleIsOpen: boolean = false;

  addfileitemupdateform=new FormGroup({

  });

  private openModel(open: boolean): void {
    this.uploadService.getFileHeaders()
    .subscribe(
      data => {
        this.listOfFileHeaders = data
        console.log("Excel Headers ------------>"+ data[0].headers[0])
        this.mdlSampleIsOpen = open;
      },
      error => console.log(error));
   }

   closeModal(close: boolean): void {
    this.mdlSampleIsOpen = close;
   }
}
