import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { HotelsListComponent } from './hotels-list/hotels-list.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { MakeBookingComponent } from './make-booking/make-booking.component';
import { BookingListComponent } from './booking-list/booking-list.component'

@NgModule({
  declarations: [
    AppComponent,
    HotelsListComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    MakeBookingComponent,
    BookingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
