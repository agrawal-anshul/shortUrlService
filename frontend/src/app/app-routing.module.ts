import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SusGenerateComponent } from './sus-generate/sus-generate.component';
import { SusPageNotFoundComponent } from './sus-page-not-found/sus-page-not-found.component';
import { SusViewUrlsComponent } from './sus-view-urls/sus-view-urls.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: SusGenerateComponent },
  { path: 'view', component: SusViewUrlsComponent },
  { path: '**', component: SusPageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
