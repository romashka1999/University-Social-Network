import { OnInit, Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    constructor(private _snackBar: MatSnackBar) {}

    ngOnInit() {
        this._snackBar.open('შეტყობინება...', 'დახურვა', {
            duration: 250000,
        });
    }
}