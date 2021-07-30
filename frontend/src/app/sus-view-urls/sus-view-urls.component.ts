import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private httpClient: HttpClient,private router: Router) { 
    this.username=localStorage.getItem('username') || ""
    if(!this.username || this.username==""){
      this.router.navigate(['login'])
    }
    this.fetchDetails()
  }

  ngOnInit(): void {
  }
  
  fetchDetails(){
    this.httpClient.get(this.apiUrl+"fetch?uid="+this.username).subscribe(
      (res:any)=>{
        // console.log(res);
        this.userUrls=res
      },
      err=>{console.log(err);}
    )
  }

}
