import {OnInit, Component, Inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Posts, Users} from '../../shared/interfaces';
import {PostService} from '../../services/post.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    constructor(private _snackBar: MatSnackBar,
                private post: PostService,
                public dialog: MatDialog,
    ) {}
    user = localStorage.getItem('st-token');
    token =  JSON.parse(atob(this.user.split('.')[1]));
    userProfile: Users[] = [this.token.user];
    posts: Posts[] = [];
    followerPost: Posts[] = [];
    ngOnInit() {
        this._snackBar.open('შეტყობინება...', 'დახურვა', {
            duration: 250000,
        });
        // console.log(this.userProfile)
        this.post.getPosts(this.userProfile[0].id)
        .subscribe((res: any) => {
          this.posts = res.data
          console.log('vamowmeb amas', res.data)
        })
        if (this.userProfile[0].followingsCount > 0) {
          this.post.getFolloweesPosts()
            .subscribe((res: any) => {
              // console.log('followers post: ', res.data)
              this.followerPost = res.data;
            })
        } else {
         console.log('shen aravis afoloveb!!!')
        }
    }

  cretePost() {
      const createPostRef = this.dialog.open(CreatePost);
      createPostRef.afterClosed().subscribe(res => {
        if (res !== undefined) {
          this.post.createPost(res)
            .subscribe((pass: any) => {
              console.log(pass)
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

