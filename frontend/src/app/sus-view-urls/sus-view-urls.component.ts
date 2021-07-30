import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sus-view-urls',
  templateUrl: './sus-view-urls.component.html',
  styleUrls: ['./sus-view-urls.component.css']
})
export class SusViewUrlsComponent implements OnInit {
  username:String=""
  userUrls:any[]=[]
  apiUrl=environment.apiUrl

  constructor(private httpClient: HttpClient) { 
    this.username=localStorage.getItem('username') || ""
    this.fetchDetails()
  }

  ngOnInit(): void {
  }
  
  fetchDetails(){
    this.httpClient.get(this.apiUrl+"fetch?uid="+this.username).subscribe(
      (res:any)=>{
        console.log(res);
        this.userUrls=res
      },
      err=>{console.log(err);}
    )
  }

}
