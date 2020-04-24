import { Component, OnInit, Input } from '@angular/core';

import { Admin } from '../admins.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @Input() admin: Admin;

  constructor() { }

  ngOnInit() {
  }

}
