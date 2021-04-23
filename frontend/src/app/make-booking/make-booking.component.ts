import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

import { NgForm } from '@angular/forms';

const CREATE_BOOKING = gql(`
  mutation createBooking(
    $hotel_id: Int!, 
    $user_id: String!, 
    $booking_start: String, 
    $booking_end: String!
  ) 
  {
    create_booking(
      hotel_id: $hotel_id, 
      user_id: $user_id, 
      booking_start: $booking_start, booking_end: $booking_end
    )
    {
      hotel_id
      user_id
      booking_date
      booking_start
      booking_end
    }
  }

`)

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.css']
})
export class MakeBookingComponent implements OnInit {

  username = localStorage.getItem('loggedInUsername');
  startDate = '';
  endDate = '';
  hotelId:number;

  constructor(private router: Router, private apollo: Apollo, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .filter(params => params.h)
    .subscribe(params => {
      this.hotelId = parseInt(params.h);
    });

  }

  saveBooking(bookingForm: NgForm): void{

    this.startDate = bookingForm.value.startDate;
    this.endDate = bookingForm.value.endDate;

    console.log(this.hotelId, this.username)


    this.apollo.mutate({
      mutation: CREATE_BOOKING,
      variables: {
        hotel_id: this.hotelId,
        user_id: this.username,
        booking_start: this.startDate,
        booking_end: this.endDate
      }
    }).subscribe((res: any) => {

      console.log(res)
      alert('Booking was added successfully');
      this.router.navigate(['/dashboard']);

    }, (err) => {
      //could not create booking
      console.log('--There was an error creating the booking', err)

    })
  }

}
