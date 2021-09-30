import { Component, OnInit } from '@angular/core';
import { FiletypeService } from '../filetype.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Filetype } from '../Filetype';
@Component({
  selector: 'app-add-filetype',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {

  constructor(private filetypeService:FiletypeService) { }

  filetype : Filetype=new Filetype();
  submitted = false;

  ngOnInit() {
    this.submitted=false;
  }

  filetypesaveform=new FormGroup({
    filetype_name:new FormControl(),
    required_fields:new FormControl(),
    data_type:new FormControl()
  });

  saveFiletype(saveFiletype){
    this.filetype=new Filetype();   
    this.filetype.filetype_name=this.FiletypeName.value;
    this.filetype.required_fields=this.RequiredFields.value;
    this.filetype.data_type=this.DataType.value;
    this.submitted = true;
    this.save();
  }

  save() {
    this.filetypeService.createFiletype(this.filetype)
      .subscribe(data => console.log(data), error => console.log(error));
    this.filetype = new Filetype();
  }

  get FiletypeName(){
    return this.filetypesaveform.get('filetype_name');
  }

  get RequiredFields(){
    return this.filetypesaveform.get('required_fields');
  }

  get DataType(){
    return this.filetypesaveform.get('data_type');
  }

  addFiletypeForm(){
    this.submitted=false;
    this.filetypesaveform.reset();
  }
}
