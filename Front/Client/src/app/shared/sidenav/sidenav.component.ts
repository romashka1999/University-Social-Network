import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'shared-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    constructor(private auth: AuthService) {}

    ngOnInit() {

    }

  logOut() {
    this.auth.logout();
  }
}
