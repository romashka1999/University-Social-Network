import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {Users} from '../../../shared/interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private data: DataService) { }
  user = localStorage.getItem('st-token')
  token =  JSON.parse(atob(this.user.split('.')[1]));
  userProfile: Users[] = [this.token.user];
  ngOnInit() {
  }

  changePhone(newPhone: string) {
    this.data.changePhone(newPhone)
      .subscribe((res) => {
        console.log(res);
      });
  }

  changePass(oldPass: string, newPass: string) {
    this.data.changePass(oldPass, newPass)
      .subscribe((res) => {
        console.log(res);
      });
  }

  changeUsername(newUsername: string) {
  this.data.changeUsername(newUsername)
    .subscribe((res) => {
      console.log(res);
    });
  }

  changeEmail(newEmail: string) {
  this.data.changeEmail(newEmail)
    .subscribe((res) => {
      console.log(res);
    });
  }
}
