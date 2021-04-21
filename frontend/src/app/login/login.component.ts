import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private router:Router) { }

  ngOnInit(): void { }

  onSubmit(loginForm: NgForm) {

    this.username = loginForm.value.username;
    this.password = loginForm.value.password;
    console.log(loginForm.value);

    if (this.username == 'admin' && this.password == 'admin') {
      localStorage.setItem('isUserLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    } 
    else {
      localStorage.setItem('isUserLoggedIn', 'false');
      alert('Invalid username or password');
    }

  }




}
