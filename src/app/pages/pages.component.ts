import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
  <app-header></app-header>
      <div class="row">
        <div class="col-md-1">
            <app-navigation></app-navigation>
        </div>    
        <div class="col-md-11">
            <router-outlet></router-outlet>
        </div>            
      </div>
  <app-footer></app-footer>
  `
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
