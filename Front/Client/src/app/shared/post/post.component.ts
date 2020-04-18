import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GetPostData } from 'src/app/models/post.model';
import { TabStore } from 'src/app/stores/tab.store';
import { Subscription } from 'rxjs';
import {PostService} from '../../services/post.service';



@Component({
    selector: 'shared-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class SharedPostComponent implements OnInit, OnDestroy {

    profileSidenavContentSub: Subscription;
    currentUserId: number;
    reacted: boolean = false;

    @Input('post') PostData: GetPostData;

    constructor(private tabStore: TabStore,
                private postService: PostService) {}

    ngOnInit() {
        this.profileSidenavContentSub = this.profileSidenavContentSub = this.tabStore.profileSidenavContent$.subscribe(res => {
            this.currentUserId = res;
        })
        this.checkPostReact();
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
}
