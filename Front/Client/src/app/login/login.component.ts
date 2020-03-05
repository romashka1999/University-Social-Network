import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    public hide = true;
    public loading: boolean = false;

    constructor() {}

    public userInfo = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    onSubmit() {
        console.log(this.userInfo)
        console.log(`Username: ${this.userInfo.value.username}  |   password: ${this.userInfo.value.password}`)
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 2000)
    }

    FormGroupErrorHandler(controlName: string) {
        if (controlName) {
            if (this.userInfo.controls[controlName] && this.userInfo.controls[controlName].errors) {
                const error = this.userInfo.controls[controlName].errors
                if (error['minlength']) {
                    return `სავალდებულოა მინიმუმ ${error['minlength'].requiredLength} სიმბოლო.`
                } else {
                    return 'ეს ველი სავალდებულოა.'
                }
            }
        }
    }

}