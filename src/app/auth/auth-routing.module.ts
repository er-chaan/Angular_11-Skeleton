import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { X404Component } from './x404/x404.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: 'signin',
      component: SigninComponent,
    },
    {
      path: 'signup',
      component: SignupComponent,
    },
    {
      path: '',
      redirectTo: 'signin',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: X404Component,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
