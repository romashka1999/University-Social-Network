import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
  }

  onLogoutAdmin() {
    this.authService.logout();
  }

}
