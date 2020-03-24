import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './modules/auth/auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {path: 'auth', loadChildren: ()=> import('./modules/auth/auth.module').then( m => m.AuthModule)},
  {path: 'dashboard', canActivate: [AuthGuardService], loadChildren: ()=> import('./modules/dashboard/dashboard.module').then( m => m.DashboardModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
