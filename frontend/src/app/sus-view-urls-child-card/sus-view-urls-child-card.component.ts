import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sus-view-urls-child-card',
  templateUrl: './sus-view-urls-child-card.component.html',
  styleUrls: ['./sus-view-urls-child-card.component.css']
})
export class SusViewUrlsChildCardComponent implements OnInit {
  apiUrl=environment.apiUrl
  private user_urls:any;    
    @Input() 
    set userUrls(data:any){
        this.user_urls=data
    }
    get userUrls(){
        return this.user_urls
    }
  constructor() {}

  ngOnInit(): void {
  }
  

}
