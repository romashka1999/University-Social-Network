import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {AuthInterceptor} from './shared/auth.interceptor';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';

//Modules
import {AppRoutingModule} from './app-routing.module';
//Components
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { HomeComponent } from './layouts/home/home.component';
//Redux devtool
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {SidenavComponent} from './shared/sidenav/sidenav.component';
import {LayoutsComponent} from './layouts/layouts.component';
import {CreatePost, ProfileComponent} from './layouts/profile/profile.component';
import {ProfileInfoComponent} from './layouts/profile/profile-info/profile-info.component';
// import { ProfileModule } from './layouts/profile/profile.module';
//env
import {environment} from 'src/environments/environment';
import { SearchComponent } from './layouts/search/search.component';
import { SettingsComponent } from './layouts/profile/settings/settings.component';
import { SharedSearchComponent } from './shared/shearch/search.component';
import { SharedProfileComponent } from './shared/profile/profile.component';
import { SharedTimelineComponent } from './shared/timeline/timeline.component';
import { SharedPostComponent } from './shared/post/post.component';
import { SharedStoryComponent } from './shared/story/story.component';
import { SharedPostPopupComponent } from './shared/post-popup/popup.component';
import { MessagesComponent } from './shared/messages/messages.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json?v=' + Date.now());
}

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LayoutsComponent,
    SidenavComponent,
    ProfileComponent,
    ProfileInfoComponent,
    SearchComponent,
    SettingsComponent,
    CreatePost,
    HomeComponent,
    SharedSearchComponent,
    SharedProfileComponent,
    SharedTimelineComponent,
    SharedPostComponent,
    SharedStoryComponent,
    SharedPostPopupComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InfiniteScrollModule,
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
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    //ProfileModule,
  ],
  providers: [MatDatepickerModule, AuthService, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
  entryComponents: [CreatePost]
})
export class AppModule {
}
