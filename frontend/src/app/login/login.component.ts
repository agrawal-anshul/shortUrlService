import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn:boolean=false
  username:string=""
  validUser:boolean=true
  apiUrl = environment.apiUrl
  constructor(private httpClient: HttpClient,public router:Router) { 
    
  }

  ngOnInit(): void {
  }

  login(){
    this.httpClient.get(this.apiUrl+"/login?username="+this.username).subscribe(
      (res:any)=>{
        console.log(res);
        if(res['status_code']==200)
        {
          this.validUser=true
          this.isLoggedIn=true
          localStorage.setItem('username', this.username)
          this.router.navigate(['home'])
          
        }else{
          this.validUser=false
        } 
      },
      err=>{console.log(err);}
      
    )
  }
  
}
