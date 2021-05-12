import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/@core/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalUsers:any;

  constructor(private toastr: ToastrService, private spinner: NgxSpinnerService, private usersService:UsersService) { }

  ngOnInit(): void {
    this.getTotalUsers();
  }

  getTotalUsers(){
    this.spinner.show();
    this.usersService.unknown().subscribe(response => {
      if(response){
        this.totalUsers = response.total;
        this.spinner.hide();
      }
    },
    error => {
      this.toastr.error(error.error.error);
      this.spinner.hide();
    });
  }

}
