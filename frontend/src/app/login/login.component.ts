import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string=""
  invalidUsername:boolean=false
  constructor(private httpClient: HttpClient) { 
    
  }

  ngOnInit(): void {
  }

  validate(){
    // httpClient.get("")
  }
}
