import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const VALIDATE = gql(`
  query check_login($username: String, $password: String){
    check_login(username: $username, password: $password){
      username
      email
    }
  }
`)

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private router:Router, private apollo:Apollo) {
    
  }

  ngOnInit(): void { }

  onSubmit(loginForm: NgForm) {

    this.username = loginForm.value.username;
    this.password = loginForm.value.password;


    this.apollo.watchQuery(
      { query: VALIDATE, variables:{ username: this.username, password: this.password } }
    ).valueChanges.subscribe((result: any)=>{
      
      if(result.data.check_login){
        console.log('--getting user', result.data.check_login)
        localStorage.setItem('isUserLoggedIn', 'true');
        localStorage.setItem('loggedInUsername', result.data.check_login.username)
        localStorage.setItem('loggedInUserEmail', result.data.check_login.email)
        this.router.navigate(['/dashboard']);
      }
      else{
        alert('Incorrect username or password')
      }
      
    })

    // if (this.username == 'admin' && this.password == 'admin') {
      
    //   localStorage.setItem('isUserLoggedIn', 'true');
    //   this.router.navigate(['/dashboard']);
    // } 
    // else {
    //   localStorage.setItem('isUserLoggedIn', 'false');
    //   alert('Invalid username or password');
    // }

  }




}
