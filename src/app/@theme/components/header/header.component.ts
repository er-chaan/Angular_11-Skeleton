import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private router:Router) { }

  ngOnInit(): void {
  }

  signOut(){
    this.spinner.show();
    this.toastr.success('Good Bye !');
    sessionStorage.clear();
    this.router.navigate(['/auth']);
    this.spinner.hide();
  }

}
