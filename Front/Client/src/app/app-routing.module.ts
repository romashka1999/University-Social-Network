import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import {AuthGuard} from './services/auth.guard';
import {SearchComponent} from './layouts/search/search.component';
import {SettingsComponent} from './layouts/profile/settings/settings.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: LayoutsComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'profile', pathMatch: 'full'},
    {path: 'profile', component: ProfileComponent },
    {path: 'search', component: SearchComponent},
    {path: 'settings', component: SettingsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
