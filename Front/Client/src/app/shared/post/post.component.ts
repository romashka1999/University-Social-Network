import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GetPostData } from 'src/app/models/post.model';
import { GetUserData } from 'src/app/models/user.model';
import { TabStore } from 'src/app/stores/tab.store';
import { Subscription } from 'rxjs';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';



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

    constructor(private tabStore: TabStore) {}

    ngOnInit() {
        this.profileSidenavContentSub = this.profileSidenavContentSub = this.tabStore.profileSidenavContent$.subscribe(res => {
            this.currentUserId = res;
        })
    }

    selectUser() {
        //check if user profile is selected
        if(this.currentUserId == this.PostData.userId) {
            console.log('New page')
        } else {
            this.tabStore.profileSidenavContent$.next(this.PostData.userId)
        }
    }

    ngOnDestroy() {
        this.profileSidenavContentSub.unsubscribe();
    }

    onReact() {
        this.reacted = !this.reacted;
    }

}
