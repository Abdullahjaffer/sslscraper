import { Component, OnInit } from '@angular/core';
import {Router}  from '@angular/router'
// import { NavbarComponent } from './../navbar/navbar.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(
    private router:Router 
    // private navbar: NavbarComponent
    ) {}

  ngOnInit() {
    localStorage.removeItem('name')
  }


  onSubmit(data:any){
    localStorage.setItem('name',data.Email)
    this.router.navigateByUrl('/');
  }
}
