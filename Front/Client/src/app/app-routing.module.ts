import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import {AuthGuard} from './services/auth.guard';
import {SearchComponent} from './layouts/search/search.component';
import {SettingsComponent} from './layouts/profile/settings/settings.component';
import {ProfileInfoComponent} from './layouts/profile/profile-info/profile-info.component';
import { HomeComponent } from './layouts/home/home.component';
import {MessagesComponent} from './shared/messages/messages.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: LayoutsComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'profile', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'profile/:id', component: ProfileInfoComponent},
    {path: 'search', component: SearchComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'messages', component: MessagesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
