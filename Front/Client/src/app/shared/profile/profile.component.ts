import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabStore } from 'src/app/stores/tab.store';
import { PostService } from '../../services/post.service';
import { GetPostData } from '../../models/post.model';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { GetUserData } from '../../models/user.model';
import { FollowersService } from '../../services/followers.service';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'shared-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class SharedProfileComponent implements OnInit, OnDestroy {

  public tabState: boolean;

  public user: GetUserData;
  public isCurrent: boolean;
  public isFollowedUser: boolean

  public posts: GetPostData[];
  private page = 0;

  constructor(
    private tabStore: TabStore,
    private followersService: FollowersService,
    private userService: UserService,
    private postService: PostService
  ) { }


  ngOnInit() {
    //Tab state Active - Hidden
    this.tabStore.profileSidenavState$.subscribe((res: boolean) => {
      this.tabState = res;
    })

    // Check if user is selected
    this.tabStore.profileSidenavContent$.subscribe(res => {
      if (res) {
        this.userService.getUserProfile(res).subscribe(userProfile => {
          this.user = userProfile.data;   // Another user
          this.isCurrent = false;
          this.isFollowed(userProfile.data.id)
          this.getUserPosts();
        })
      } else {
        this.user = this.userService.getCurrentUser();   // Current user
        this.isCurrent = true;
        this.getUserPosts();
      }
    })
  }

  ngOnDestroy() { }

  toggleTabState(status: boolean) {
    this.tabStore.profileSidenavState$.next(status);
  }

  followUser() {
    this.followersService.followUser(this.user.id)
      .subscribe((res) => {
        this.isFollowedUser = true;
        this.updateFollowersCount();
      });
  }

  unFollowUser() {
    this.followersService.unFollowUser(this.user.id)
      .subscribe((res) => {
        this.isFollowedUser = false;
        this.updateFollowersCount();
      });
  }

  isFollowed(id: number) {
    this.followersService.isFollowed(id)
      .subscribe((res) => {
        this.isFollowedUser = res.data;
      });
  }

  updateFollowersCount() {
    this.userService.getUserProfile(this.user.id).subscribe(res => {
      this.user.followersCount = res.data.followersCount;
      this.user.followingsCount = res.data.followingsCount;
    })
  }

  getUserPosts() {
    this.postService.getPosts(this.user.id, this.page)
      .pipe(
        map(postData => {
          postData.data.map(post => {
            post['user_firstName'] = this.user.firstName;
            post['user_lastName'] = this.user.lastName;
            return post;
          })
          return postData
        })
      )
      .subscribe(posts => {
        this.posts = posts.data;
      })
  }

  onUserClick() {
    console.log('New page');
    this.page = 0;
  }

  onScroll() {
    this.page++;
    this.postService.getPosts(this.user.id, this.page) //aq unda gadasce im profilis user id vistanac xar! da gaanule 'page' roca sxva user id shemova!!!
      .subscribe((res) => {
        console.log(res.data)
        this.posts.push(...res.data);
        console.log(this.posts)
      });
  }
}
