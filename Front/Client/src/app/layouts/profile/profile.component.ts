import {OnInit, Component, Inject, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Posts, Users} from '../../shared/interfaces';
import {PostService} from '../../services/post.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WebSocketService} from '../../services/web-socket.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    constructor(private _snackBar: MatSnackBar,
                private post: PostService,
                public dialog: MatDialog,
                private webSocket: WebSocketService
    ) {}
    public connectSocketSub: Subscription;
    public realTimePostSub: Subscription;
    user = localStorage.getItem('st-token');
    token =  JSON.parse(atob(this.user.split('.')[1]));
    userProfile: Users[] = [this.token.user];
    posts: Posts[] = [];
    ngOnInit() {
        this._snackBar.open('შეტყობინება...', 'დახურვა', {
            duration: 250000,
        });
        // console.log(this.userProfile)
        this.post.getPosts(this.userProfile[0].id)
        .subscribe((res: any) => {
          this.posts = res.data
          console.log(res)
          // console.log('vamowmeb amas', res.data)
        })
        if (this.userProfile[0].followingsCount > 0) {
          this.post.getFolloweesPosts()
            .subscribe((res: any) => {
              // console.log(res.data);
              this.posts.push(...res.data);
            });
        } else {
         console.log('shen aravis afoloveb!!!');
        }
        this.connectSocketSub = this.webSocket.connect().subscribe();
        this.realTimePostSub = this.webSocket.getRealTimePost().subscribe((data: any) => {
          this.posts.unshift(data)
          console.log(data);
        })
    }
    ngOnDestroy() {
      this.connectSocketSub.unsubscribe();
      this.realTimePostSub.unsubscribe();
    }

  cretePost() {
      const createPostRef = this.dialog.open(CreatePost);
      createPostRef.afterClosed().subscribe(res => {
        if (res !== undefined) {
          this.post.createPost(res)
            .subscribe((pass: any) => {
              // console.log(pass)
              this.posts.unshift(pass.data)
            })
        }
      });

  }

  removePost(id: number) {
    this.post.deletePost(id)
      .subscribe(() => {
        this.posts = this.posts.filter(t => t.id !== id)
      })
  }

  editPost(id: number) {
    // this.post.editPost()
  }
}
@Component({
  selector: 'create-post',
  templateUrl: 'create-post.html'
})
export class CreatePost implements OnInit {
  form: FormGroup;
  content: string;
  constructor(private fb: FormBuilder,
              private createPostRef: MatDialogRef<CreatePost>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.content = data;
  }
  ngOnInit() {
    this.form = this.fb.group({
      content: [this.content, []]
    });
  }
  save() {
    this.createPostRef.close(this.form.value);
  }
  close() {
    this.createPostRef.close();
  }
}

