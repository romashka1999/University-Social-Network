import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminsService } from '../admins.service';
import { Admin } from '../admins.interface';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  admin: Admin;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly adminsService: AdminsService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const adminId = +params.id;
      this.adminsService.getAdmin(adminId).subscribe( (res) => {
        this.admin = res.data;
      })
    })
  }

}
