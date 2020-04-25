import { Component, OnInit } from '@angular/core';
import { AdminRolesService } from './admin-roles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminRole } from './admin-roles.interface';

@Component({
  selector: 'app-admin-roles',
  templateUrl: './admin-roles.component.html',
  styleUrls: ['./admin-roles.component.scss']
})
export class AdminRolesComponent implements OnInit {

  adminsRolereateForm: FormGroup;
  adminRoles: AdminRole[];

  constructor(private readonly adminRolesService: AdminRolesService) { }

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
    }, (err) => {
      console.log(err);
    })
  }

}
