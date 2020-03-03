import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'my-app',
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.scss']
})
export class WelcomeComponent {
  constructor(
    private http: HttpClient
    ) {}
    ngOnInit() {
      this.http.get('http://api.ipify.org/?format=json').subscribe(
        (ip : any)=>{
          let token = localStorage.getItem('token')
          let existing = false
          if(token){
            existing = true
          }else{
          localStorage.setItem('token',Math.random().toString())
          token = localStorage.getItem('token')
          } 
          let data = {
            ip : ip.ip,
            existing : existing,
            token : token
          }
          this.http.post('api/v1/lacoste',data).subscribe(res=>{
            console.log(res)
          },err=>{
            console.log(err)
          })
        },
        err=>{
          console.log(err)
        }
      )
    }
 }
