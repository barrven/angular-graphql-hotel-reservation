import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CREATE_ACCOUNT = gql(`
  mutation createProfile($username: String!, $password: String!, $email: String!){
    create_profile(username: $username, password: $password, email: $email){
      username
      password
      email
    }
  }
`);

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username!: string;
  password!: string;
  email!: string;

  constructor(private router: Router, private apollo: Apollo) { }

  ngOnInit(): void { }

  onSubmit(signupForm: NgForm) {

    this.username = signupForm.value.username;
    this.password = signupForm.value.password;
    this.email = signupForm.value.email;
    console.log(signupForm.value);

    this.apollo.mutate({ 
        mutation: CREATE_ACCOUNT,
        variables: {
          username: this.username,
          password: this.password,
          email: this.email
        } 
    }).subscribe((res) =>{

      //successfully created user
      console.log('-- got data', res.data)

    }, (err) => {
      //could not create user
      console.log('--There was an error creating the user', err)

    })

    // if (this.username == 'admin' && this.password == 'admin') {
    //   localStorage.setItem('isUserLoggedIn', 'true');
    //   this.router.navigate(['/dashboard']);
    // }
    // else {
    //   localStorage.setItem('isUserLoggedIn', 'false');
    //   alert('Could not create account');
    // }

  }

  // upvote() {
  //   this.apollo.mutate({
  //     mutation: UPVOTE_POST,
  //     variables: {
  //       postId: 12
  //     }
  //   }).subscribe(({ data }) => {
  //     console.log('got data', data);
  //   }, (error) => {
  //     console.log('there was an error sending the query', error);
  //   });
  // }



}
