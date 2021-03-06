import { ValidationGuard } from './validation.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'
import { MakeBookingComponent } from './make-booking/make-booking.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [ValidationGuard] } ,
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'book', component: MakeBookingComponent, canActivate: [ValidationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
