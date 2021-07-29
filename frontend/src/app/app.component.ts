import { Component } from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, vmBugIcon,cogIcon,userIcon,copyIcon,redoIcon,envelopeIcon,homeIcon } from '@cds/core/icon';
import { Router } from '@angular/router';
ClarityIcons.addIcons(vmBugIcon,cogIcon,userIcon,copyIcon,redoIcon,envelopeIcon,homeIcon);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shortUrlService';
  username:string;
  constructor(public router:Router){
    this.username=localStorage.getItem('username') || ""
  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['login'])
  }
}
