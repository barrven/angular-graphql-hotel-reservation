import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const GET_BOOKINGS = gql(`
  {
    list_bookings {
      hotel_id
      user_id
      booking_date
      booking_start
      booking_end
    }
 }
`);

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: any[];

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({ query: GET_BOOKINGS }).valueChanges.subscribe((res: any)=>{
      this.bookings = res?.data?.list_bookings
    })
  }

}
