import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminsService } from '../admins.service';
import { Admin } from '../admins.interface';
import { ServerError } from 'src/app/shared/server-response.interface';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  loading: boolean;
  admin: Admin;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly adminsService: AdminsService,
    private readonly snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      const adminId = +params.id;
      this.adminsService.getAdmin(adminId).subscribe( (res) => {
        this.admin = res.data;
        console.log(this.admin);
        this.loading = false;
      }, (err) => {
        this.router.navigate(['/admins']);
      });
    });
  }

  onDeleteAdmin() {
    this.adminsService.deleteAdmin(this.admin.id).subscribe((res) => {
      this.snackBar.open(res.message, '', { panelClass: ['mat-toolbar', 'mat-primary'], duration: 4000 , verticalPosition: 'bottom', horizontalPosition: 'right'});
      this.router.navigate(['../'], { relativeTo: this.route });
    }, (err: ServerError) => {
      console.log(err);
      this.snackBar.open(err.error.message, '', { panelClass: ['mat-toolbar','mat-accent'] ,duration: 4000 , verticalPosition: 'bottom', horizontalPosition: 'right',});
    })
  }

}
