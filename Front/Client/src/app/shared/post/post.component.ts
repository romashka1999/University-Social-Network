import { Component, OnInit, Input } from '@angular/core';
import { GetPostData } from 'src/app/models/post.model';
import { GetUserData } from 'src/app/models/user.model';



@Component({
    selector: 'shared-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class SharedPostComponent implements OnInit {

    @Input('post') PostData: GetPostData;

    constructor() {}
    ngOnInit() {
    }
}
