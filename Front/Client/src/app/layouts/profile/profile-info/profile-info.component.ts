import {Component, OnInit} from '@angular/core';
import {Users} from '../../../shared/interfaces';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
    user = localStorage.getItem('st-token');
    token =  JSON.parse(atob(this.user.split('.')[1]));
    userProfile: Users[] = [this.token.user];
    constructor(private data: DataService, private route: ActivatedRoute) {
      route.params.subscribe((param) => {
          this.data.getProfile(param.id)
            .subscribe((res) => {
              this.userProfile = [res.data]
              console.log(res.data)
            })
      })
    }
    ngOnInit() {
    }
}
