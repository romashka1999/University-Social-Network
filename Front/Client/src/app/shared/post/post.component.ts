import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GetPostData } from 'src/app/models/post.model';
import { TabStore } from 'src/app/stores/tab.store';
import { Subscription } from 'rxjs';
import {PostService} from '../../services/post.service';
import {CommentService} from '../../services/comment.service';
import {GetCommentDataModel} from '../../models/comment.model';
import {map} from 'rxjs/operators';



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
    @Input('post') PostData: GetPostData;
    @Input('comments') comments: GetCommentDataModel[] = [];
    constructor(private tabStore: TabStore,
                private postService: PostService,
                private commentService: CommentService
    ) {}

    ngOnInit() {
        this.profileSidenavContentSub = this.profileSidenavContentSub = this.tabStore.profileSidenavContent$.subscribe(res => {
            this.currentUserId = res;
        })
        this.checkPostReact();
        this.getPostComment();
    }

    selectUser() {
        //check if user profile is selected
        if (this.currentUserId == this.PostData.userId) {
            console.log('New page')
        } else {
            this.tabStore.profileSidenavContent$.next(this.PostData.userId)
        }
    }

    ngOnDestroy() {
        this.profileSidenavContentSub.unsubscribe();
    }

    onReact() {
        console.log('react')
        this.postService.reactPost(this.PostData.id)
          .subscribe((res) => {
          console.log(res);
          this.reacted = true;
          });
    }

    unReact() {
      console.log('unreact')
      this.postService.unReactPost(this.PostData.id)
        .subscribe((res) => {
          console.log(res);
          this.reacted = false;
        });
    }

    checkPostReact() {
        this.postService.checkPostReact(this.PostData.id).subscribe(res => {
            this.reacted = res.data;
        })
    }
    getPostComment() {
        this.commentService.getPostComment(this.PostData.id, this.page).subscribe(res => {
          this.comments.push(...res.data);
        });
        this.page++;
    }
    // luka aq daamate MAP it chemi saxeli da gvari!
    addPostComment(content) {
        this.commentService.addPostComment(this.PostData.id, content).subscribe(res => {
          // @ts-ignore
          this.comments.push(res.data);
        });
    }
}
