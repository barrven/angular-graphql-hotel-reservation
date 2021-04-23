import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

const GET_HOTELS = gql(`
  {
    list_hotels {
      hotel_id
      hotel_name
      street
      city
      postal_code
      price
      email
    }
 }
`);

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit {

  //hotels: Observable<any>;
  username = '';
  email = '';
  hotels: any[];
  loading = true;
  error: any;

  constructor(private router:Router, private apollo: Apollo) { }

  ngOnInit(): void {


    this.apollo.watchQuery(
      {query: GET_HOTELS}
    ).valueChanges.subscribe((result: any)=>{
      this.hotels = result?.data?.list_hotels;
      this.loading = result.loading;
      this.error = result.error;
    })

  }

  addBooking(hotelId:number):void {
    this.router.navigate(['/book'], { queryParams: { h: hotelId } });
  }

}
