import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabStore } from 'src/app/stores/tab.store';
import { PostService } from '../../services/post.service';
import { GetPostData } from '../../models/post.model';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { GetUserData } from '../../models/user.model';
import { FollowersService } from '../../services/followers.service';

@Component({
  selector: 'shared-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class SharedProfileComponent implements OnInit, OnDestroy {

  public tabState: boolean;
  public userProfile = [JSON.parse(atob(localStorage.getItem('st-token').split('.')[1])).user];
  public anotherUserProfile: GetUserData = this.userProfile[0];
  public ifFollow = false;
  posts: GetPostData[];
  constructor(private tabStore: TabStore,
              private postService: PostService,
              private dataService: DataService,
              private followersService: FollowersService,
  ) { }
  private userSub: Subscription;
  private postSub: Subscription;
  ngOnInit() {
    this.tabStore.profileSidenavState$.subscribe((res: boolean) => { this.tabState = res; });
    this.postService.getPosts(this.anotherUserProfile.id)
      .subscribe((res) => {
        this.posts = res.data;
      });
    this.userSub = this.dataService.searchResult
      .subscribe((id: number) => {
        this.dataService.getProfile(id)
          .subscribe((res) => {
            this.anotherUserProfile = res.data;
            this.isFollowed(id);
          });
      });
    this.postSub = this.dataService.searchResult
      .subscribe((id: number) => {
        this.postService.getPosts(id)
          .subscribe((res) => {
            this.posts = res.data;
          });
      });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.postSub.unsubscribe();
  }

  toggleTabState(status: boolean) {
    this.tabStore.profileSidenavState$.next(status);
  }

  followUser(id: number) {
    this.followersService.followUser(id)
      .subscribe((res) => {
        console.log(res);
        this.ifFollow = true;
      });
  }

  unFollowUser(id: number) {
    this.followersService.unFollowUser(id)
      .subscribe((res) => {
        console.log(res);
        this.ifFollow = false;
      });
  }
  isFollowed(id: number) {
    this.followersService.isFollowed(id)
      .subscribe((res) => {
        this.ifFollow = res.data;
        console.log(res);
      });

  }
}
