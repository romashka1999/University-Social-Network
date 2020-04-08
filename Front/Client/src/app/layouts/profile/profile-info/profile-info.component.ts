import {Component, OnInit} from '@angular/core';
import {Users} from '../../../shared/interfaces';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../services/data.service';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit{
    userProfile: Users[] = [];
    constructor(private http: HttpClient, private data: DataService) {}
    ngOnInit() {
      this.data.getProfile()
        .subscribe(userProfile => {
          this.userProfile.push(userProfile.data)
          console.log(this.userProfile);
        })
    }
}
