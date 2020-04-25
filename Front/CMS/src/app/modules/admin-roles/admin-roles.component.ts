import { Component, OnInit } from '@angular/core';
import { AdminRolesService } from './admin-roles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminRole } from './admin-roles.interface';
import { MatSnackBar } from '@angular/material';
import { ServerError } from 'src/app/shared/server-response.interface';

@Component({
  selector: 'app-admin-roles',
  templateUrl: './admin-roles.component.html',
  styleUrls: ['./admin-roles.component.scss']
})
export class AdminRolesComponent implements OnInit {

  adminsRolereateForm: FormGroup;
  adminRoles: AdminRole[];

  constructor(
    private readonly adminRolesService: AdminRolesService,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
    this.adminsRolereateForm = new FormGroup({
      role: new FormControl(null, Validators.required)
    });
    this.adminRolesService.getAdminRoles().subscribe((res) => {
      console.log(res);
      this.adminRoles = res.data;
    });
  }

  onCreateAdminRole() {
    const adminRoleCreateDto = this.adminsRolereateForm.value;

    this.adminRolesService.createAdminRole(adminRoleCreateDto).subscribe( (res) => {
      this.adminRoles.push(res.data);
      this.snackBar.open(res.message, '', { panelClass: ['mat-toolbar', 'mat-primary'], duration: 4000 , verticalPosition: 'bottom', horizontalPosition: 'right'});
    }, (err: ServerError) => {
      console.log(err);
      this.snackBar.open(err.error.message, '', { panelClass: ['mat-toolbar','mat-accent'] ,duration: 4000 , verticalPosition: 'bottom', horizontalPosition: 'right',});
    })
  }

}
