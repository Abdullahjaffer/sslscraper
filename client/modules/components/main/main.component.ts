import { Component, OnInit } from '@angular/core';
import {Router}  from '@angular/router';
import {HttpClient} from '@angular/common/http';
// import { NavbarComponent } from './../navbar/navbar.component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  username: string = '';
  items : any;
  list : any;
  resulter : string;
  offsets:Array<Object> = [
    {num: 0, name: "0"},
    {num: 1, name: "50"},
    {num: 2, name: "100"},
    {num: 3, name: "150"},
    {num: 4, name: "200"},
    {num: 5, name: "250"},
    {num: 6, name: "300"},
    {num: 7, name: "350"},
    {num: 8, name: "400"},
];
counts:Array<Object> = [
  {num: 1, name: "10"},
    {num: 2, name: "20"},
    {num: 3, name: "30"},
    {num: 4, name: "40"},
    {num: 5, name: "50"},
];
selectedoffset: any;
selectedcount : any;
  constructor(
    private router:Router ,
    private http: HttpClient
    ) {}

  ngOnInit() {
    this.selectedoffset=this.offsets[0]
    this.selectedcount = this.counts[4]
    this.username = localStorage.getItem('name')
    this.http.get('api/v1/query/getlistname').subscribe(res=>{
      this.items = res
      this.getresult(this.items[0])
    },err=>{
      console.log(err)
    })
  }
  getresult(query:string){
    this.resulter= query
    console.log("getting request for"+query)
    this.http.get('api/v1/query/getlist/'+query).subscribe(res=>{
      this.list = res
    },err=>{
      console.log(err)
    })
  }
  onSubmit(data:any){
    console.log(data.Query)
    console.log(this.selectedcount.name)
    console.log(this.selectedoffset.name)
    this.http.get(`api/v1/query/${data.Query}/${this.selectedcount.name}/${this.selectedoffset.name}/en-US`).subscribe(res=>{
      console.log(res)
      this.http.get('api/v1/query/getlistname').subscribe(res=>{
        this.items = res
        if(!this.items){
          this.items = ['empty']
        }else{
          this.getresult(data.Query)
        }
        
      },err=>{
        console.log(err)
      })
    },err=>{
      console.log(err)
    })
  }
  deleteall(data:any){
    if(confirm("ARE YOU SURE BOY?")){
      this.http.delete('api/v1/query/'+data).subscribe((res)=>{
        console.log(res)
        this.ngOnInit()
      },
      err=>{
        alert("failed")
      })
    }
  }
}
