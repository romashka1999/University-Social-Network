import { Component, OnInit } from '@angular/core';
import { TabStore } from 'src/app/stores/tab.store';

@Component({
    selector: 'shared-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class SharedProfileComponent implements OnInit {

    public tabState: boolean

    constructor(private tabStore: TabStore) {}

    ngOnInit() {
        this.tabStore.profileSidenavState$.subscribe((res: boolean) => { this.tabState = res })
    }

    toogleTabState(status: boolean) {
        this.tabStore.profileSidenavState$.next(status)
    }
}