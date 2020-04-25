import { Component, OnInit } from '@angular/core';
import { AdminRolesService } from '../admin-roles.service';
import { AdminPermission, AdminRole } from '../admin-roles.interface';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-admin-role-edit',
  templateUrl: './admin-role-edit.component.html',
  styleUrls: ['./admin-role-edit.component.scss']
})
export class AdminRoleEditComponent implements OnInit {

  adminPermissions: AdminPermission[];
  adminPermissionsForm: FormGroup;
  adminRole: AdminRole;

  constructor(
    private readonly adminRolesService: AdminRolesService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.adminPermissionsForm = this.formBuilder.group({
      permissions: new FormArray([])
    });
    
    this.adminRolesService.getAdminRolePermissions().subscribe( (res) => {
      this.adminPermissions = res.data;
      this.addCheckboxes();
    }, (err) => {
      console.log(err);
    });


    this.route.params.subscribe( (params: Params) => {
      const adminRoleId = +params.id;
      this.adminRolesService.getAdminRole(adminRoleId).subscribe( (res) => {
        console.log(res.data);
        this.adminRole = res.data;
      }, (err) => {
        console.log(err);
      });
    });
  }

  private addCheckboxes() {
    this.adminPermissions.forEach((permission, idx) => {
      const control = new FormControl(false);
      (this.adminPermissionsForm.controls.permissions as FormArray).push(control);
    });
  }

  saveAdminPermmisions() {
    const slectedPermissionIds = this.adminPermissionsForm.value.permissions
      .map((v, i) => (v ? this.adminPermissions[i].id : null))
      .filter(v => v !== null);
    console.log(slectedPermissionIds);
  }

}
