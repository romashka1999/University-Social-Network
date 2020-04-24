import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminRolesComponent } from './admin-roles.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { AdminRoleEditComponent } from './admin-role-edit/admin-role-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: AdminRolesComponent},
  {path: 'edit/:id', component: AdminRoleEditComponent}
]

@NgModule({
  declarations: [AdminRolesComponent, AdminRoleComponent, AdminRoleEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AdminRolesModule { }
