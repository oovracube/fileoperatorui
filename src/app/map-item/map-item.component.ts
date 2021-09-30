import { Component, OnInit } from '@angular/core';
import { FiletypeService } from '../filetype.service';
import { Filemapping } from '../filemappings';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-map-fileitem',
  templateUrl: './map-item.component.html',
  styleUrls: ['./map-item.component.css']
})
export class MapitemComponent implements OnInit {

 constructor(private filetypeService:FiletypeService) { }

  mapfiletypesArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();
  filemappings: Observable<Filemapping[]>;
  filemapping : Filemapping = new Filemapping();
  deleteMessage=false;
  filemappinglist:any;
  dropdownlist:any;
  isupdated = false;
  selectOptions = "l[labelProperty] for l in list";   
 

  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };   
      this.filetypeService.getFilemappingList().subscribe(data =>{
      this.filemappings =data;
      this.dtTrigger.next();
      })
  }
  
  getDropDownData(){
    this.filetypeService.getAllFiletypes()
      .subscribe(
        data => {
          this.dropdownlist=data
          console.log(this.dropdownlist)
        },
        error => console.log(error));
  }


  updateFilemapping(id: number){
    this.getDropDownData();
    this.filetypeService.getFilemapping(id)
      .subscribe(
        data => {
          this.filemappinglist=data           
        },
        error => console.log(error));
  }

  updateFtp(updftp){
   this.filemapping=new Filemapping(); 
   this.filemapping.filemapping_id=this.Filemapping_Id.value;
   this.filemapping.fileheader_name=this.Fileheader_Name.value;
   this.filemapping.filemapping_name=this.Filemapping_Name.value;
   this.filemapping.new_mapping=this.New_mapping.value;
   
   

   this.filetypeService.updateFilemapping(this.filemapping.filemapping_id,this.filemapping).subscribe(
    data => {     
      this.isupdated=true;
      this.filetypeService.getFilemappingList().subscribe(data =>{
        this.filemapping =data
        })
    },
    error => console.log(error));
  }


  filemappingupdateform=new FormGroup({
    filemapping_id:new FormControl(),
    fileheader_name:new FormControl(),
    filemapping_name:new FormControl(),
    new_mapping:new FormControl(),
  });

  get Filemapping_Id(){
    return this.filemappingupdateform.get('filemapping_id');
  }

  get Fileheader_Name(){
    return this.filemappingupdateform.get('fileheader_name');
  }

  get Filemapping_Name(){
    return this.filemappingupdateform.get('filemapping_name');
  }

  get New_mapping(){
    return this.filemappingupdateform.get('new_mapping');
  }

  changeisUpdate(){
    this.isupdated=false;
  }
}
