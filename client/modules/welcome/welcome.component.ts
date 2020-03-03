import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'my-app',
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.scss']
})
export class WelcomeComponent {
  constructor(
    // @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
    ) {}
    ngOnInit() {
      this.http.jsonp('https://api6.ipify.org?format=jsonp','callback').subscribe(
        (ip : any)=>{
          console.log(ip)
          let token = localStorage.getItem('tokenSting')
          let existing = false
          if(token){
            existing = true
          }else{
          localStorage.setItem('tokenSting',Math.random().toString())
          token = localStorage.getItem('tokenSting')
          } 
          let data = {
            ip : ip.ip,
            existing : existing,
            token : token
          }
          this.http.post('api/v1/lacoste',data).subscribe((res : any)=>{
            console.log(res)
            // this.router.navigateByUrl('/login');
            window.location.href='https://www.clinch.pk/';
          },err=>{
            console.log(err)
          })
        }
      )
      // this.http.jsonp('https://api6.ipify.org?format=jsonp','callback')
      // .subscribe(res=>console.log(res))
    }
 }
