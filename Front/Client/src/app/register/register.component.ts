import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {LanguageService} from '../services/language.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Gender} from '../shared/interfaces';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  genders: Gender[] = [
    {value: 'MALE', viewValue: 'Male'},
    {value: 'FEMALE', viewValue: 'Female'},
    {value: 'OTHER', viewValue: 'Other'}
  ];

  public inputs: {}[] = [
    {},
  ];

  public hide = true;
  public loading: boolean = false;
  public lang: string;

  constructor(private translateService: TranslateService,
              private languageService: LanguageService,
              private auth: AuthService,
              private router: Router
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(Date.now());
  }

  public userInfo = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    birthdate: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.minLength(9), Validators.pattern('[0-9]{9}')]),
    email: new FormControl('', [Validators.email]),
    gender: new FormControl(''),
    image: new FormControl('')
  });
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.initLanguage();
  }

  onSubmit() {
    console.log(this.userInfo);
    // console.log(`Username: ${this.userInfo.value.username}  |   password: ${this.userInfo.value.password}`)
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    this.auth.addUser({
      firstName: this.userInfo.value.name,
      lastName: this.userInfo.value.lastname,
      gender: this.userInfo.value.gender,
      username: this.userInfo.value.username,
      email: this.userInfo.value.email,
      phoneNumber: this.userInfo.value.phone,
      password: this.userInfo.value.password,
      birthDate: this.userInfo.value.birthdate
    })
      .subscribe(user => {
        console.log(user);
        this.userInfo.reset();
        this.router.navigate(['/login']);
      });
  }

  // FormGroupErrorHandler(controlName: string) {
  //     if (controlName) {
  //         if (this.userInfo.controls[controlName] && this.userInfo.controls[controlName].errors) {
  //             const error = this.userInfo.controls[controlName].errors
  //             if (error['minlength']) {
  //                 return `სავალდებულოა მინიმუმ ${error['minlength'].requiredLength} სიმბოლო.`
  //             } else {
  //                 return 'FIELD_REQUIRED'
  //             }
  //         }
  //     }
  // }

  private initLanguage() {
    this.languageService.language$.subscribe(lang => {
      this.translateService.use(lang);
      console.log(lang);
      this.lang = lang;
    });
  }

  onFileChanged(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userInfo.patchValue({
        image: file
      });
    }
  }
}
