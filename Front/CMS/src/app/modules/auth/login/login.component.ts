import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  authSub: Subscription;
  
  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    const signedInData = this.loginForm.value;
    this.authSub = this.authService.login(signedInData).subscribe( (res) => {
      if(res) {
        this.authService.setTokenToLocalstorage(res.data.accessToken);
      }
    })
    this.loginForm.reset();
  }

  ngOnDestroy() {
    // this.authSub.unsubscribe();
  }



}
