import { Component, OnInit, Input } from '@angular/core';
import { AdminRole } from '../admin-roles.interface';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.scss']
})
export class AdminRoleComponent implements OnInit {

  @Input() adminRole: AdminRole;

  constructor() { }

  ngOnInit() {
    console.log(this.adminRole);
  }

}
