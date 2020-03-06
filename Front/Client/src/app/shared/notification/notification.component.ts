import { Component, OnInit, Output, Input } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'shared-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{

    @Input('text') notifyBody: string;
    @Input('type') notifyType: string = 'primary';
    @Input('duraction') notifyDuraction: number;

    public display: string = "active";

    constructor(private _snackBar: MatSnackBar) {}

    ngOnInit() {
        // this._snackBar.open(this.notifyBody, this.notifyAction, {
        //     duration: this.notifyDuraction * 1000,
        // });
    }

    onClose() {
        this.display = "hide"
        setTimeout(() => {
            this.display = "close"
        }, 500)
    }

}