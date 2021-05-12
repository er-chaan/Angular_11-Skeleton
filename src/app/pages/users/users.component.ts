import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/@core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private toastr: ToastrService, private spinner: NgxSpinnerService, private usersService:UsersService) { }

  userForm:FormGroup;
  nameError:any;
  jobError:any;

  ngOnInit(): void {
    this.getUsers();
    this.nameError=false;
    this.jobError=false;
    this.userForm = this.formBuilder.group({
      name : ["", [Validators.required]],
      job:["",[Validators.required]]
    });
  }
  
  get f() { return this.userForm.controls; }

  createUser(){
    this.spinner.show();
    this.nameError=false;
    this.jobError=false;
    if(this.userForm.invalid){
      if(this.f.name.errors){
        this.nameError = "invalid name";
      }
      if(this.f.job.errors){
        this.jobError = "invalid job";
      }
      this.spinner.hide();
      return;
    }
    if(this.userForm.valid){

      if(this.modalTitle === 'Add User'){
        this.usersService.createUser(this.userForm.value).subscribe(response => {
          if(response){
            this.toastr.success("Created !");
            this.getUsers();
            this.spinner.hide();
            document.getElementById("closeModal").click();
          }
        },
        error => {
          this.toastr.error(error.error.error);
          this.spinner.hide();
        });        
      }

      if(this.modalTitle === 'Edit User'){
        this.usersService.updateUser(this.userForm.value).subscribe(response => {
          if(response){
            this.toastr.success("Updated !");
            this.getUsers();
            this.spinner.hide();
            document.getElementById("closeModal").click();
          }
        },
        error => {
          this.toastr.error(error.error.error);
          this.spinner.hide();
        });
      }
    
    }
  }

  data:any;
  page:any; 
  per_page:any;
  total:any;
  total_pages:any;

  getUsers(){
    this.spinner.show();
    this.usersService.getUsers().subscribe(response => {
      if(response){
        this.data = response.data;
        this.page = response.page;
        this.per_page = response.per_page;
        this.total = response.total;
        this.total_pages = response.total_pages;
        this.spinner.hide();
      }
    },
    error => {
      this.toastr.error(error.error.error);
      this.spinner.hide();
    });
  }

  deleteUserId:number = 0;
  deleteUserConfirm(id){
    this.deleteUserId = id;
    document.getElementById("myConfirmModalTrigger").click();
  }

  modalTitle:any;
  addUserModal(){
    this.userForm.reset();
    this.modalTitle = "Add User";
    document.getElementById("myModalTrigger").click();
  }

  editUserModal(data){
    this.userForm.patchValue({
      name: data.first_name,
      job: data.last_name
    });
    this.modalTitle = "Edit User";
    document.getElementById("myModalTrigger").click();

  }

  deleteUser(){
    this.spinner.show();
    this.usersService.deleteUser(this.deleteUserId).subscribe(response => {
      if(response){
          this.toastr.success("Deleted !");
          this.getUsers();
        this.spinner.hide();
        this.deleteUserId = 0;
      }
    },
    error => {
      this.toastr.error(error.error.error);
      this.spinner.hide();
    });
    this.toastr.success("Deleted !");
    this.spinner.hide();
  }




}
