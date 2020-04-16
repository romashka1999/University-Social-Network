import {Component, OnDestroy, OnInit} from '@angular/core';
import { TabStore } from 'src/app/stores/tab.store';
import { PostService } from 'src/app/services/post.service';
import { GetPostData } from 'src/app/models/post.model';
import {Subscription} from 'rxjs';
import {WebSocketService} from '../../services/web-socket.service';


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

    public profileTabState: boolean;
    public postPopupState: boolean;
    private connectSocketSub: Subscription;
    private realTimePostSub: Subscription;
    public posts: GetPostData[] = [];

    constructor(private tabStore: TabStore,
                private postService: PostService,
                private webSocket: WebSocketService
    ) {

    }

    ngOnInit() {
        this.tabStore.profileSidenavState$.subscribe((res: boolean) => {
            this.profileTabState = res;
        });
        this.tabStore.postPopupState$.subscribe((res: boolean) => {
            this.postPopupState = res;
        });
        this.postService.getFollowersPosts().subscribe(res => {
            this.posts.push(...res.data)
            console.log(this.posts);
        });
        this.connectSocketSub = this.webSocket.connect().subscribe();
        this.realTimePostSub = this.webSocket.getRealTimePost().subscribe((data: any) => {
         this.posts.unshift(data);
         console.log(data);
        });
    }
    ngOnDestroy() {
      this.connectSocketSub.unsubscribe();
      this.realTimePostSub.unsubscribe();
    }

  onCreatePost(data: string) {
        this.postService.createPost(data).subscribe(res => {
            console.log(res);
            // @ts-ignore
            // esec gaaswore
            this.posts.unshift(res.data);
            this.tabStore.postPopupState$.next(false);
        });
    }

    openPostPopup(state: boolean) {
        console.log(state)
        this.tabStore.postPopupState$.next(state)
    }
}
