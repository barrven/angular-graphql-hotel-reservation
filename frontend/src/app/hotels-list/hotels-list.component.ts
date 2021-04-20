import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  hotels: Observable<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.hotels = this.apollo
      .watchQuery({query: GET_HOTELS})
      .valueChanges.pipe(
        map((result: any)=>{
          console.log(result.data.list_hotels)
          return result.data.list_hotels;
        })
      )
  }

}
