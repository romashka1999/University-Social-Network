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
    userProfile: Users[] = [];
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
        this.ifFollowed = false;
        console.log(this.ifFollowed)
      })
  }
    unfollowUser() {
    this.http.get(`http://localhost:3000/public/users/unfollowUser/${this.id}`)
      .subscribe((res) => {
        console.log(res)
        this.ifFollowed = true;
        console.log(this.ifFollowed)
      })
  }
}
