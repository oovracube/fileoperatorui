import { Component, OnInit } from '@angular/core';
import { FileitemService } from '../fileitem.service';
import { Fileitem } from '../Fileitem';
import { Observable,Subject } from "rxjs";
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

 constructor(private fileitemService:FileitemService) { }

  fileitemsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  fileitems: Observable<Fileitem[]>;
  fileitem : Fileitem=new Fileitem();
  deleteMessage=false;
  fileitemlist:any;
  isupdated = false;    
 

  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };   
    this.fileitemService.getFileitemList().subscribe(data =>{
    this.fileitems =data;
    this.dtTrigger.next();
    })
  }
  
  deleteFileitem(id: number) {
    this.fileitemService.deleteFileitem(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.fileitemService.getFileitemList().subscribe(data =>{
            this.fileitem =data
            })
        },
        error => console.log(error));
  }


  updateFileitem(id: number){
    this.fileitemService.getFileitem(id)
      .subscribe(
        data => {
          this.fileitemlist=data           
        },
        error => console.log(error));
  }

  fileitemupdateform=new FormGroup({
    fileitem_id:new FormControl(),
    company_id:new FormControl(),
    employee_unique_id:new FormControl(),
    employee_name:new FormControl(),
    employee_title:new FormControl(),
    manager_name:new FormControl(),
    email_address:new FormControl(),
    phone:new FormControl(),
    app:new FormControl()
  });

  updateFip(updstu){
   this.fileitem=new Fileitem(); 
   this.fileitem.fileitem_id=this.FileItemid.value;
   this.fileitem.company_id=this.Company_id.value;
   this.fileitem.employee_unique_id=this.Employee_unique_id.value;
   this.fileitem.employee_name=this.Employee_name.value;
   this.fileitem.employee_title=this.Employee_title.value;
   this.fileitem.manager_name=this.Manager_name.value;
   this.fileitem.email_address=this.Email_address.value;
   this.fileitem.phone=this.Phone.value;
   this.fileitem.app=this.App.value;
   console.log(this.fileitem.app);
   

   this.fileitemService.updateFileitem(this.fileitem.fileitem_id,this.fileitem).subscribe(
    data => {     
      this.isupdated=true;
      this.fileitemService.getFileitemList().subscribe(data =>{
        this.fileitems =data
        })
    },
    error => console.log(error));
  }

  get App(){
    return this.fileitemupdateform.get('app');
  }

  get Phone(){
    return this.fileitemupdateform.get('phone');
  }

  get Email_address(){
    return this.fileitemupdateform.get('email_address');
  }

  get Manager_name(){
    return this.fileitemupdateform.get('manager_name');
  }

  
  get Employee_title(){
    return this.fileitemupdateform.get('employee_title');
  }

  get Employee_name(){
    return this.fileitemupdateform.get('employee_name');
  }

  get Employee_unique_id(){
    return this.fileitemupdateform.get('employee_unique_id');
  }

  get Company_id(){
    return this.fileitemupdateform.get('company_id');
  }

  get FileItemid(){
    return this.fileitemupdateform.get('fileitem_id');
  }

  changeisUpdate(){
    this.isupdated=false;
  }
}
