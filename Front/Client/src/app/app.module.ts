import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {AuthService} from './services/auth.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//Material
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatSnackBarModule } from '@angular/material/snack-bar';
//Modules

import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
//Redux devtool
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { ProfileInfoComponent } from './layouts/profile/profile-info/profile-info.component';
import { HeaderComponent } from './shared/header/header.component';

// import { ProfileModule } from './layouts/profile/profile.module';
//env
import { environment } from 'src/environments/environment';
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json?v=' + Date.now());
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LayoutsComponent,
    SidenavComponent,
    ProfileComponent,
    ProfileInfoComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    //ProfileModule,
  ],
  providers: [MatDatepickerModule, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
