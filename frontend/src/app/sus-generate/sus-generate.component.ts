import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sus-generate',
  templateUrl: './sus-generate.component.html',
  styleUrls: ['./sus-generate.component.css']
})
export class SusGenerateComponent implements OnInit {

  username:String=""
  apiUrl=environment.apiUrl
  longUrl:string=""
  customUrlString:string=""
  tinyUrl:string=""
  d=new Date()
  expiryDate:Date=new Date(this.d.getFullYear(),this.d.getMonth(),this.d.getDate()+3)

  constructor(private httpClient: HttpClient){
    this.username=localStorage.getItem('username') || ""
  }
  
  ngOnInit(): void {
  }

  generate(){
    // console.log(this.longUrl);
    // console.log(this.customUrlString);
    // console.log(this.expiryDate.toISOString());

    this.httpClient.post(this.apiUrl+"create",{
      'uid':this.username,
      'custom_alias':this.customUrlString,
      'original_url':this.longUrl,
      'exp_date':this.expiryDate.toISOString()
    }).subscribe(
      (res:any)=>{
        console.log(res);
        this.tinyUrl=res
      },
      err=>{console.log(err);}
    )
  }
}
