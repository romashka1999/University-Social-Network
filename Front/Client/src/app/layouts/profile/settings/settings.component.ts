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
  userProfile: Users[] = [];
  ngOnInit() {
    this.data.getProfile()
      .subscribe(userProfile => {
        this.userProfile.push(userProfile.data)
        console.log(this.userProfile);
      });
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
