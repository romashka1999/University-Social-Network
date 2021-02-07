import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {GetPostData} from 'src/app/models/post.model';
import {TabStore} from 'src/app/stores/tab.store';
import {Subscription} from 'rxjs';
import {PostService} from '../../services/post.service';
import {CommentService} from '../../services/comment.service';
import {GetCommentDataModel} from '../../models/comment.model';
import {map} from 'rxjs/operators';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'shared-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class SharedPostComponent implements OnInit, OnDestroy {

  profileSidenavContentSub: Subscription;
  currentUserId: number;
  reacted: boolean = false;
  page = 0;
  myUserId = this.userService.getCurrentUser().id;
  comments: GetCommentDataModel[] = [];
  @Input('post') PostData: GetPostData;

  constructor(private tabStore: TabStore,
              private postService: PostService,
              private commentService: CommentService,
              private userService: UserService
  ) {
  }

  ngOnInit() {
    this.profileSidenavContentSub = this.tabStore.profileSidenavContent$.subscribe(res => {
      this.currentUserId = res;
    });
    this.checkPostReact();
    this.getPostComment();
  }

  selectUser() {
    // check if user profile is selected
    if (this.currentUserId === this.PostData.userId) {
      console.log('New page');
    } else {
      this.tabStore.profileSidenavContent$.next(this.PostData.userId);
    }
  }

  ngOnDestroy() {
    this.profileSidenavContentSub.unsubscribe();
  }

  onReact() {
    this.postService.reactPost(this.PostData.id)
      .subscribe(() => {
        this.reacted = true;
      });
  }

  unReact() {
    this.postService.unReactPost(this.PostData.id)
      .subscribe(() => {
        this.reacted = false;
      });
  }

  checkPostReact() {
    this.postService.checkPostReact(this.PostData.id).subscribe(res => {
      this.reacted = res.data;
    });
  }

  getPostComment() {
    this.commentService.getPostComment(this.PostData.id, this.page)
      .subscribe(res => {
        this.comments.push(...res.data);
        this.PostData['comments'] = this.comments;
    });
    this.page++;
  }
  addPostComment(content) {
    this.commentService.addPostComment(this.PostData.id, content)
      .pipe(
        map((arr) => {
          arr.data['userFirstName'] = this.userService.getCurrentUser().firstName;
          arr.data['userLastName'] = this.userService.getCurrentUser().lastName;
          return arr;
        })
      )
      .subscribe(() => {});
  }

  delPostComment(commentId) {
    this.commentService.delPostComment(this.PostData.id, commentId).subscribe(() => {})
  }
}
