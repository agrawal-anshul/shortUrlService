import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sus-view-urls-child-card',
  templateUrl: './sus-view-urls-child-card.component.html',
  styleUrls: ['./sus-view-urls-child-card.component.css']
})
export class SusViewUrlsChildCardComponent implements OnInit {
  newUserUrl:any=[]
  apiUrl=environment.apiUrl
  private user_urls:any;    
    @Input() 
    set userUrls(data:any){
        this.user_urls=data
    }
    get userUrls(){
        return this.user_urls
    }
  
    ngOnChanges(changes:SimpleChanges){
      const dataChange:SimpleChange=changes.userUrls;
      this.userUrls=dataChange.currentValue
      if(this.userUrls){
        // console.log(this.userUrls);
        this.parseItems()  
      }
    }
  constructor(private httpClient: HttpClient,private router: Router) {
    
  }

  ngOnInit(): void {
  }

  parseItems(){
    let data=this.userUrls    
    
    data.forEach((dataObject:any) => {
      let temp:any={}
      Object.entries(dataObject).forEach((element:any)=>{
        let [key,value]=element
        if (key=="creation_date" || key=="expiration_date"){
          if(value){
            temp[key]=new Date(value["$date"]) 
          }else{
            temp[key]=value 
          }
        }else{
          temp[key]=value
        }
      })
      this.newUserUrl.push(temp)
    }); 
    // console.log(this.newUserUrl);
  }
  
  delete(short_url:string){
    this.httpClient.get(this.apiUrl+"delete?short_url="+short_url).subscribe(
      (res:any)=>{
        // console.log(res);
        window.location.reload()
      },
      err=>{console.log(err);}
    )
    // // this.newUserUrl=this.newUserUrl.filter((item:any)=>{item['short_url']!==short_url})
    // console.log(this.newUserUrl);
  }
}
