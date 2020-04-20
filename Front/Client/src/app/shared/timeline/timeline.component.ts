import { Component, OnInit, Output, Input } from '@angular/core';
import { GetPostData } from 'src/app/models/post.model';
import {GetCommentDataModel} from '../../models/comment.model';

@Component({
    selector: 'shared-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class SharedTimelineComponent implements OnInit {

    @Input('posts') posts: GetPostData[]
    @Input('comments') comments: GetCommentDataModel[];
    constructor() {}

    ngOnInit() {
    }
}
