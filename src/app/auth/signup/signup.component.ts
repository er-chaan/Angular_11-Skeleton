import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../@core/services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  data:any;
  signupForm:FormGroup;
  emailError:any;
  passwordError:any;

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private formBuilder:FormBuilder,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.emailError=false;
    this.passwordError=false;
    this.signupForm = this.formBuilder.group({
      email : ["eve.holt@reqres.in", [Validators.required, Validators.email ]],
      password:["cityslicka",[Validators.required]]
    });
  }
  get f() { return this.signupForm.controls; }
  signup(){
    this.spinner.show();
    this.emailError=false;
    this.passwordError=false;
    if(this.signupForm.invalid){
      if(this.f.email.errors){
        this.emailError = "invalid email";
      }
      if(this.f.password.errors){
        this.passwordError = "invalid password";
      }
      this.spinner.hide();
      return;
    }
    if(this.signupForm.valid){
      this.authService.signup(this.signupForm.value).subscribe(response => {
        if(response.token){
          sessionStorage.clear();
          sessionStorage.setItem('email',this.signupForm.get('email').value);
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