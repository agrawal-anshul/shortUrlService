import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sus-generate',
  templateUrl: './sus-generate.component.html',
  styleUrls: ['./sus-generate.component.css']
})
export class SusGenerateComponent implements OnInit {

  longUrl:string=""
  shortUrl:string=""
  shortUrl1:string=""
  constructor() { }

  ngOnInit(): void {
  }

}
