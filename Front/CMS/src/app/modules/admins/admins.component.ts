import { Component, OnInit } from '@angular/core';
import { AdminsService } from './admins.service';
import { Admin } from './admins.interface';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AdminRolesService } from '../admin-roles/admin-roles.service';
import { AdminRole } from '../admin-roles/admin-roles.interface';
import { MatSnackBar } from '@angular/material';
import { ServerError } from 'src/app/shared/server-response.interface';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  public admins: Admin[];
  public adminsCreateForm: FormGroup;
  public adminRoles: AdminRole[];

  constructor(
    private readonly adminsService: AdminsService,
    private readonly adminRolesService: AdminRolesService,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
    this.adminsCreateForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)]),
      role: new FormControl(null, Validators.required)
    });

    this.adminsService.getAdmins().subscribe( (res) => {
      console.log(res.data);
      this.admins = res.data;
    }, (err) => {
      console.log(err);
    });


    this.adminRolesService.getAdminRoles().subscribe((res) => {
      this.adminRoles = res.data;
    }, (err) => {
      console.log(err);
    });
  }

  onCreateAdmin() {
    const adminCreateDto = {
      email: this.adminsCreateForm.value.email,
      password: this.adminsCreateForm.value.password,
      adminRoleId: this.adminsCreateForm.value.role
    };
    console.log(adminCreateDto);

    this.adminsService.createAdmin(adminCreateDto).subscribe( (res) => {
      this.admins.push(res.data);
      this.snackBar.open(res.message, '', { panelClass: ['mat-toolbar', 'mat-primary'], duration: 4000 , verticalPosition: 'bottom', horizontalPosition: 'right'});
    }, (err: ServerError) => {
      console.log(err);
      this.snackBar.open(err.error.message, '', { panelClass: ['mat-toolbar','mat-accent'] ,duration: 4000 , verticalPosition: 'bottom', horizontalPosition: 'right',});
    })
  }

}
