import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { TranslateService } from "@ngx-translate/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

export interface Users {
  id?: number
  firstName: string
  lastName: string
  gender: string
  username: string
  email: string
  phoneNumber: string
  password: string
  birthDate: Date
}


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    minDate: Date;
    maxDate: Date;

    public inputs: {}[] = [
        {},
    ]

    public hide = true;
    public loading: boolean = false;
    private lang: string;

    user: Users[] = []

    constructor(private translateService: TranslateService,
                private languageService: LanguageService,
                private auth: AuthService,
                private router: Router,
                private http: HttpClient
    ) {
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 100, 0, 1);
      this.maxDate = new Date(currentYear, 2, 31);
    }

    public userInfo = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phone: new FormControl('', [Validators.required, Validators.minLength(9)]),
        birthdate: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email]),
        image: new FormControl(''),
        gender: new FormControl('MALE')
    });

    ngOnInit() {
        this.initLanguage();
    }

    onSubmit() {
        // console.log(this.userInfo)
        // // console.log(`Username: ${this.userInfo.value.username}  |   password: ${this.userInfo.value.password}`)
        // this.loading = true;
        // setTimeout(() => {
        //     this.loading = false;
        // }, 2000)


        const newUser: Users = {
        firstName: 'giorgi',
        lastName: 'tandila',
        gender: this.userInfo.value.gender,
        username: 'giorgi',
        email: 'skype@gmail.com',
        phoneNumber: '555101010',
        password: 'Giorgi123',
        birthDate: new Date(),
      }
        console.log(newUser)
        this.http.post<Users>('http://localhost:3000/auth/user/signUp', newUser)
          .subscribe(user => {
            console.log(user)
            // this.userInfo.reset()
          })
    }

    FormGroupErrorHandler(controlName: string) {
        if (controlName) {
            if (this.userInfo.controls[controlName] && this.userInfo.controls[controlName].errors) {
                const error = this.userInfo.controls[controlName].errors
                if (error['minlength']) {
                    return `სავალდებულოა მინიმუმ ${error['minlength'].requiredLength} სიმბოლო.`
                } else {
                    return 'FIELD_REQUIRED'
                }
            }
        }
    }

    private initLanguage() {
        this.languageService.language$.subscribe(lang => {
          this.translateService.use(lang);
          console.log(lang)
          this.lang = lang;
        });
    }

  onFileChanged(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userInfo.patchValue({
        image: file
      })
    }
  }
}
