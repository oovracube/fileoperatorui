import { Component, OnInit } from '@angular/core';
import { FiletypeService } from '../filetype.service';
import { Filetype } from '../Filetype';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-filetype-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {

 constructor(private filetypeService:FiletypeService) { }

  filetypesArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  filetypes: Observable<Filetype[]>;
  filetype : Filetype=new Filetype();
  deleteMessage=false;
  filetypelist:any;
  isupdated = false;    
 

  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };   
    this.filetypeService.getFiletypeList().subscribe(data =>{
    this.filetypes =data;
    this.dtTrigger.next();
    })
  }
  
  deleteFiletype(id: number) {
    this.filetypeService.deleteFiletype(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.filetypeService.getFiletypeList().subscribe(data =>{
            this.filetype =data
            })
        },
        error => console.log(error));
  }


  updateFiletype(id: number){
    this.filetypeService.getFiletype(id)
      .subscribe(
        data => {
          this.filetypelist=data           
        },
        error => console.log(error));
  }

  filetypeupdateform=new FormGroup({
    filetype_id:new FormControl(),
    filetype_name:new FormControl(),
    required_fields:new FormControl(),
    data_type:new FormControl()
  });

  updateFtp(updftp){
   this.filetype=new Filetype(); 
   this.filetype.filetype_id=this.FiletypeId.value;
   this.filetype.filetype_name=this.FiletypeName.value;
   this.filetype.required_fields=this.Required_Fields.value;
   this.filetype.data_type=this.Data_Type.value;
   console.log(this.Data_Type.value);
   

   this.filetypeService.updateFiletype(this.filetype.filetype_id,this.filetype).subscribe(
    data => {     
      this.isupdated=true;
      this.filetypeService.getFiletypeList().subscribe(data =>{
        this.filetype =data
        })
    },
    error => console.log(error));
  }

  get Data_Type(){
    return this.filetypeupdateform.get('data_type');
  }

  get FiletypeName(){
    return this.filetypeupdateform.get('filetype_name');
  }

  get Required_Fields(){
    return this.filetypeupdateform.get('required_fields');
  }

  get FiletypeId(){
    return this.filetypeupdateform.get('filetype_id');
  }

  changeisUpdate(){
    this.isupdated=false;
  }
}
