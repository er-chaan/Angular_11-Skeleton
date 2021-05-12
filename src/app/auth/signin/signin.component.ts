import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../@core/services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  data:any;
  signinForm:FormGroup;
  emailError:any;
  passwordError:any;
  public loading = false;

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private formBuilder:FormBuilder,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.emailError=false;
    this.passwordError=false;
    this.signinForm = this.formBuilder.group({
      email : ["eve.holt@reqres.in", [Validators.required, Validators.email ]],
      password:["cityslicka",[Validators.required]]
    });
  }
  get f() { return this.signinForm.controls; }
  signin(){
    this.spinner.show();
    this.emailError=false;
    this.passwordError=false;
    if(this.signinForm.invalid){
      if(this.f.email.errors){
        this.emailError = "invalid email";
      }
      if(this.f.password.errors){
        this.passwordError = "invalid password";
      }
      this.spinner.hide();
      return;
    }
    if(this.signinForm.valid){
      this.authService.signin(this.signinForm.value).subscribe(response => {
        if(response.token){
          sessionStorage.clear();
          sessionStorage.setItem('email',this.signinForm.get('email').value);
          sessionStorage.setItem('token',response.token);
          this.router.navigate(['/pages/dashboard/']);
          this.spinner.hide();
        }
      },
      error => {
        this.toastr.error(error.error.error);
        this.spinner.hide();
      });
    }
  }

}