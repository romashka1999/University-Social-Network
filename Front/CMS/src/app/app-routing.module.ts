import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './modules/auth/auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {path: 'auth', loadChildren: ()=> import('./modules/auth/auth.module').then( m => m.AuthModule)},
  {path: 'dashboard', canActivate: [AuthGuardService], loadChildren: ()=> import('./modules/dashboard/dashboard.module').then( m => m.DashboardModule)},
  {path: 'admins', canActivate: [AuthGuardService], loadChildren: ()=> import('./modules/admins/admins.module').then( m => m.AdminsModule)},
  {path: 'adminRoles', canActivate: [AuthGuardService], loadChildren: ()=> import('./modules/admin-roles/admin-roles.module').then( m => m.AdminRolesModule)},
  {path: 'chat', canActivate: [AuthGuardService], loadChildren: ()=> import('./modules/chat/chat.module').then( m => m.ChatModule)},
  {path: 'translations', canActivate: [AuthGuardService], loadChildren: ()=> import('./modules/translations/translations.module').then( m => m.TranslationsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
