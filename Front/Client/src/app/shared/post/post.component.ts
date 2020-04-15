import { Component, OnInit, Output, Input } from '@angular/core';
import { GetPostData } from 'src/app/models/post.model';
import { GetUserData } from 'src/app/models/user.model';


@Component({
    selector: 'shared-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class SharedPostComponent implements OnInit {

    @Input('post') PostData: GetPostData;

    public userData: GetUserData;

    constructor() {}

    ngOnInit(){
        this.userData = {
            "id": 5,
            "firstName": "Luka",
            "lastName": "Qantaria",
            "birthDate": "1999-02-12T20:00:00.000Z",
            "gender": "MALE",
            "profileImgUrl": null,
            "coverImageUrl": null,
            "email": "l_kantaria@cu.edu.ge",
            "username": "LukaQantaria",
            "phoneNumber": "558775311",
            "publicUser": true,
            "status": "VERIFIED",
            "followersCount": 1,
            "followingsCount": 1
        }
    }
}