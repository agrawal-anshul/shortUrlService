import { Component } from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, vmBugIcon,cogIcon,userIcon,copyIcon,redoIcon,envelopeIcon } from '@cds/core/icon';
ClarityIcons.addIcons(vmBugIcon,cogIcon,userIcon,copyIcon,redoIcon,envelopeIcon);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shortUrlService';
}
