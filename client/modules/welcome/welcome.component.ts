import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { DOCUMENT } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'my-app',
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.scss']
})
export class WelcomeComponent {
  deviceInfo: any = null
  constructor(
    // @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private deviceService: DeviceDetectorService
    ) {
      // this.epicFunction();
    }
    epicFunction() {
      console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
      console.log(this.deviceInfo);
      console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      console.log(isTablet);  // returns if the device us a tablet (iPad etc)
      console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
    }
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
          // console.log()
          let data = {
            ip : ip.ip,
            existing : existing,
            token : token,
            device : JSON.stringify(this.deviceService.getDeviceInfo())
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
