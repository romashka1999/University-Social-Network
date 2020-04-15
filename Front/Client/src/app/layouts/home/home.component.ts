import { Component, OnInit } from '@angular/core';
import { TabStore } from 'src/app/stores/tab.store';
import { PostService } from 'src/app/services/post.service';
import { GetPostData } from 'src/app/models/post.model';
import { filter } from 'rxjs/operators';


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public profileTabState: boolean;
    public postPopupState: boolean

    public posts: GetPostData[];

    constructor(private tabStore: TabStore, private postService: PostService) {

    }

    ngOnInit() {
        this.tabStore.profileSidenavState$.subscribe((res: boolean) => {
            this.profileTabState = res;
        });
        this.tabStore.postPopupState$.subscribe((res: boolean) => {
            this.postPopupState = res;
        })
        this.postService.getFolloweesPosts().subscribe(res => {
            this.posts = res.data
        })
    }

    onCreatePost(data: string) {
        this.postService.createPost(data).subscribe(res => {
            console.log(res);
            this.tabStore.postPopupState$.next(false)
        })
    }

    openPostPopup(state: boolean) {
        console.log(state)
        this.tabStore.postPopupState$.next(state)
    }
}