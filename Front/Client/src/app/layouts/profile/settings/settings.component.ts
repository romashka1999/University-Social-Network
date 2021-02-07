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
  NotificationGranted: boolean = false;
  ngOnInit() {
    if (Notification.permission === 'granted') {
      this.NotificationGranted = true;
    }
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
  notifyMe() {
    if (!window.Notification) {
      console.log('Browser does not support notifications.');
    } else {
      // check if permission is already granted
      if (Notification.permission === 'granted') {
        this.NotificationGranted = true;
      } else {
        // request permission from user
        Notification.requestPermission().then((p) => {
          if (p === 'granted') {
            this.NotificationGranted = true;
            // show notification here
            const n = new Notification('Thanks for subscription!', {
              body: 'Nice! your request accepted!',
              icon: 'https://img.favpng.com/9/25/24/computer-icons-instagram-logo-sticker-png-favpng-LZmXr3KPyVbr8LkxNML458QV3_t.jpg',
            });
          } else {
            console.log('User blocked notifications.');
          }
        }).catch((err) => {
          console.error(err);
        });
      }
    }
  }
}
