import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabStore } from 'src/app/stores/tab.store';
import { PostService } from 'src/app/services/post.service';
import { GetPostData } from 'src/app/models/post.model';
import { PostSocketService } from '../../services/posts-socket.service';
import {GetCommentDataModel} from '../../models/comment.model';
import { Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public profileTabState: boolean;
  public postPopupState: boolean;
  public posts: GetPostData[] = [];
  public comments: GetCommentDataModel[] = [];
  private page = 0;

  private postCreatedSub: Subscription;
  private postReactedSub: Subscription;
  private postUnReactedSub: Subscription;
  private commentCreatedSub: Subscription;
  private getFollowersPostsSub: Subscription;

  constructor(
    private tabStore: TabStore,
    private postService: PostService,
    private postSocketService: PostSocketService,
    private userService: UserService) { }

  ngOnInit() {

    this.tabStore.profileSidenavState$.subscribe((res: boolean) => {
      this.profileTabState = res;
    });

    this.tabStore.postPopupState$.subscribe((res: boolean) => {
      this.postPopupState = res;
    });

    this.getFollowersPostsSub = this.postService.getFollowersPosts(this.page).subscribe(posts => {
      this.posts.push(...posts.data);
    });

    this.postSocketService.connect();

    this.postCreatedSub = this.postSocketService.postCreated().subscribe((post: GetPostData) => {
      this.posts.unshift(post);
      if (Notification.permission === 'granted' && post.userId !== this.userService.getCurrentUser().id) {
        this.showNotification(post);
      }
    });
    this.postReactedSub = this.postSocketService.postReacted().subscribe((data) => {
      console.log(data);
    });
    this.postUnReactedSub = this.postSocketService.postUnReacted().subscribe((data) => {
      console.log(data);
    });
    this.postSocketService.commentDeleted().subscribe((data) => {
      console.log(data);
    })
    this.commentCreatedSub = this.postSocketService.commentCreated().subscribe((comment: GetCommentDataModel) => {
      for (let i = 0; i < this.posts.length; i++) {
        if (comment.postId === this.posts[i].id) {
          this.posts[i].comments.push(comment);
        }
      }
    });
    // this.postSocketService.commentDeleted((data) => {
    //   console.log(data);
    // });
  }

  ngOnDestroy() {
    this.postCreatedSub.unsubscribe();
    this.postReactedSub.unsubscribe();
    this.postUnReactedSub.unsubscribe();
    this.commentCreatedSub.unsubscribe();
    this.getFollowersPostsSub.unsubscribe();
  }

  onCreatePost(data: string) {
    this.postService.createPost(data)
      .subscribe(() => {
        this.tabStore.postPopupState$.next(false);
      });
  }

  openPostPopup(state: boolean) {
    console.log(state);
    this.tabStore.postPopupState$.next(state);
  }
  onScroll() {
    this.page++;
    this.postService.getFollowersPosts(this.page)
      .subscribe((res) => {
        this.posts.push(...res.data);
      });
  }
  showNotification(post: GetPostData) {
    const n = new Notification(`New Post from ${post.user_firstName} ${post.user_lastName}`, {
      body: post.content,
      icon: post.user_profileImgUrl,
    });
  }
}
