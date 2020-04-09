import { OnInit, Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Users} from '../../shared/interfaces';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    constructor(private _snackBar: MatSnackBar) {}
    user = localStorage.getItem('st-token');
    token =  JSON.parse(atob(this.user.split('.')[1]));
    userProfile: Users[] = [this.token.user];

    ngOnInit() {
        this._snackBar.open('შეტყობინება...', 'დახურვა', {
            duration: 250000,
        });
    }
}
