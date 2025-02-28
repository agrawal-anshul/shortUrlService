import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SusGenerateComponent } from './sus-generate/sus-generate.component';
import { SusPageNotFoundComponent } from './sus-page-not-found/sus-page-not-found.component';
import { LoginComponent } from './login/login.component'; 
import {HttpClientModule} from '@angular/common/http';
import { SusViewUrlsComponent } from './sus-view-urls/sus-view-urls.component';
import { SusViewUrlsChildCardComponent } from './sus-view-urls-child-card/sus-view-urls-child-card.component';
import { CookieModule } from 'ngx-cookie';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    SusGenerateComponent,
    SusPageNotFoundComponent,
    LoginComponent,
    SusViewUrlsComponent,
    SusViewUrlsChildCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    CookieModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
