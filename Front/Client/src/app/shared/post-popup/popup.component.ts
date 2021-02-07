import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { TabStore } from 'src/app/stores/tab.store';

@Component({
    selector: 'shared-post-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class SharedPostPopupComponent implements OnInit{

    @ViewChild('postBody') postContent: ElementRef;

    @Output() postData: EventEmitter<string> = new EventEmitter();

    constructor(private tabStore: TabStore) { }

    ngOnInit() {

    }

    onSubmit() {
        console.log(this.postContent.nativeElement.value);
        this.postData.emit(this.postContent.nativeElement.value);
        this.postContent.nativeElement.value = '';
    }
}
