import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TabStore } from 'src/app/stores/tab.store';
import { PostService } from 'src/app/services/post.service';
import { GetPostData } from 'src/app/models/post.model';
import { Subscription } from 'rxjs';
import { PostSocketService } from '../../services/posts-socket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public profileTabState: boolean;
  public postPopupState: boolean;
  public posts: GetPostData[] = [];
  private page = 0;

  constructor(
    private tabStore: TabStore,
    private postService: PostService,
    private postSocketService: PostSocketService) { }

  ngOnInit() {

    this.tabStore.profileSidenavState$.subscribe((res: boolean) => {
      this.profileTabState = res;
    });

    this.tabStore.postPopupState$.subscribe((res: boolean) => {
      this.postPopupState = res;
    });

    this.postService.getFollowersPosts(this.page).subscribe(res => {
      this.posts.push(...res.data);
      console.log(this.posts);
    });

    this.postSocketService.connect();

    this.postSocketService.postCreated((data: any) => {
      this.posts.unshift(data);
      console.log(data);
    });
  }

  ngOnDestroy() {}

  onCreatePost(data: string) {
    this.postService.createPost(data)
      .subscribe(res => {
        console.log(res);
        // @ts-ignore
        // esec gaaswore
        // this.posts.unshift(res.data);
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
}
