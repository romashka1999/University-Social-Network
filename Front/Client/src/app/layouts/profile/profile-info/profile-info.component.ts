import {Component, OnInit} from '@angular/core';
import {Posts, Users} from '../../../shared/interfaces';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PostService} from '../../../services/post.service';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
    user = localStorage.getItem('st-token');
    token =  JSON.parse(atob(this.user.split('.')[1]));
    userProfile: Users[] = [this.token.user];
    anotherUserProfile: Users[] = [this.token.user];
    posts: Posts[] = [];
    id: number;
    constructor(private data: DataService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private post: PostService
    ) {
      route.params.subscribe((param) => {
          this.id = param.id
          this.data.getProfile(param.id)
            .subscribe((res) => {
              this.anotherUserProfile = [res.data]
              console.log(res.data)
            })
      })
    }
    ngOnInit() {
      this.post.getPosts(this.id)
      .subscribe((res: any) => {
        this.posts = res.data
        console.log(res.data)
      })
    }

  followUser() {
    this.http.get(`http://localhost:3000/public/followers/followUser/${this.id}`)
      .subscribe((res) => {
        console.log(res)
        this.userProfile[0].following = false;
      })
  }
    unfollowUser() {
    this.http.get(`http://localhost:3000/public/followers/unfollowUser/${this.id}`)
      .subscribe((res) => {
        console.log(res)
        this.userProfile[0].following = true;
        console.log(this.userProfile[0].following)
      })
  }

  removePost(id: number) {
    this.post.deletePost(id)
      .subscribe(() => {
        this.posts = this.posts.filter(t => t.id !== id)
      })
  }

  editPost(id: number) {
    // this.post.editPost()
  }
}
