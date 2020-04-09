import {Component, OnInit} from '@angular/core';
import {Users} from '../../../shared/interfaces';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
    user = localStorage.getItem('st-token');
    token =  JSON.parse(atob(this.user.split('.')[1]));
    userProfile: Users[] = [this.token.user];
    ifFollowed: boolean;
    id: number;
    constructor(private data: DataService, private route: ActivatedRoute, private http: HttpClient) {
      route.params.subscribe((param) => {
          this.id = param.id
          this.data.getProfile(param.id)
            .subscribe((res) => {
              this.userProfile = [res.data]
              console.log(res.data)
            })
      })
    }
    ngOnInit() {
      this.http.get<any>(`http://localhost:3000/public/users/checkfollowing/${this.id}`)
        .subscribe(res => {
          this.ifFollowed = res.data;
        });
    }

  followUser() {
    this.http.get(`http://localhost:3000/public/users/followUser/${this.id}`)
      .subscribe((res) => {
        console.log(res)
      })
  }
    unfollowUser() {
    this.http.get(`http://localhost:3000/public/users/unfollowUser/${this.id}`)
      .subscribe((res) => {
        console.log(res)
      })
  }
}
