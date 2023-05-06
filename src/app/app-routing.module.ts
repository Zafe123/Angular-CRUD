import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: EmployeedashboardComponent },
      { path: 'userinfo', component: UserinfoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
