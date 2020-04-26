import { Component, OnInit } from '@angular/core';
import { AdminRolesService } from '../admin-roles.service';
import { AdminPermission, AdminRole } from '../admin-roles.interface';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ServerError } from 'src/app/shared/server-response.interface';
import { Admin } from '../../admins/admins.interface';

@Component({
  selector: 'app-admin-role-edit',
  templateUrl: './admin-role-edit.component.html',
  styleUrls: ['./admin-role-edit.component.scss']
})
export class AdminRoleEditComponent implements OnInit {

  loading: boolean = true;
  adminPermissions: AdminPermission[];
  adminPermissionsForm: FormGroup;
  adminRole: AdminRole;

  admins: Admin[];

  constructor(
    private readonly adminRolesService: AdminRolesService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.adminPermissionsForm = this.formBuilder.group({
      permissions: new FormArray([])
    });


    this.route.params.subscribe((params: Params) => {
      const adminRoleId = +params.id;
      this.adminRolesService.getAdminRole(adminRoleId).subscribe((res) => {
        this.adminRole = res.data;
        this.admins = this.adminRole.admins;
        this.adminRolesService.getAdminRolePermissions().subscribe((res) => {
          this.adminPermissions = res.data;
          this.addCheckboxes();
          this.loading = false;
        }, (err) => {
          console.log(err);
        });
      }, (err) => {
        this.router.navigate(['/adminRoles']);
      });
    });
  }

  private addCheckboxes() {
    console.log('checkbox', this.adminRole)
    this.adminPermissions.forEach((permission, idx) => {
      const existPemission: boolean =  this.adminRole.permissions.find( prms => prms.id === permission.id) ? true : false;
      const control = new FormControl(existPemission);
      (this.adminPermissionsForm.controls.permissions as FormArray).push(control);
    });
  }

  saveAdminPermmisions() {
    this.loading = true;
    const slectedPermissionIds = this.adminPermissionsForm.value.permissions
      .map((v, i) => (v ? this.adminPermissions[i].id : null))
      .filter(v => v !== null);
    console.log(slectedPermissionIds);
    this.adminRolesService.updateAdminRole(this.adminRole.id, { role: this.adminRole.role, permissionRoleIds: slectedPermissionIds }).subscribe((res) => {
      console.log(res);
      this.snackBar.open(res.message, '', { panelClass: ['mat-toolbar', 'mat-primary'], duration: 4000 , verticalPosition: 'bottom', horizontalPosition: 'right'});
      this.loading = false;
    }, (err: ServerError) => {
      console.log(err);
      this.snackBar.open(err.error.message, '', { panelClass: ['mat-toolbar','mat-accent'] ,duration: 4000 , verticalPosition: 'bottom', horizontalPosition: 'right',});
      this.loading = false;
    })
  }

  onDeletAdminRole() {
    this.adminRolesService.deleteAdminRole(this.adminRole.id).subscribe((res) => {
      this.snackBar.open(res.message, '', { panelClass: ['mat-toolbar', 'mat-primary'], duration: 4000 , verticalPosition: 'bottom', horizontalPosition: 'right'});
      this.router.navigate(['/adminRoles']);
    }, (err: ServerError) => {
      console.log(err);
      this.snackBar.open(err.error.message, '', { panelClass: ['mat-toolbar','mat-accent'] ,duration: 4000 , verticalPosition: 'bottom', horizontalPosition: 'right',});
    })
  }

}
