import { Component, OnInit, Input } from '@angular/core';
import {Router}  from '@angular/router';
import {HttpClient} from '@angular/common/http';
// import { NavbarComponent } from './../navbar/navbar.component'
import * as moment from 'moment';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  @Input() item : any;
  date: string;
  myVar1: boolean;
  myVar2: boolean;
  show: boolean;
  emailShow: boolean
  constructor(
    private router:Router ,
    private http: HttpClient
    ) {}

  ngOnInit() {
    this.date = moment(this.item.updatedAt).format('DD-MMM, hA');
    this.myVar1 = this.item.contacted
    this.myVar2 = this.item.responded
    this.show = true
    this.emailShow = false
    console.log(this.item.emails)
  }
  save(){
    this.http.post('api/v1/query/save',{
      _id: this.item._id,
      contacted: this.myVar1,
      responded: this.myVar2
    }).subscribe(
      res=>{
        console.log("done")
      },
      err=>{
        console.log(err)
      }
    )
  }
  delete(){
    if(confirm("Are you sure mothafucka?")){
      this.http.post('api/v1/query/delete',{
        _id: this.item._id,
      }).subscribe(
        res=>{
          console.log("done")
          this.show = false
        },
        err=>{
          console.log(err)
        }
      )
    }
  }
  searchEmail(){
    this.http.post('api/v1/query/getEmails',{
      url: this.item.url,
    }).subscribe(
      res=>{
        this.item = res
      },
      err=>{
      }
    )
  }
  
}
