import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  {path: '', component: AdminsComponent},
  {path: ':id', component: AdminProfileComponent}
]

@NgModule({
  declarations: [
    AdminsComponent, 
    AdminProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AdminsModule { }
