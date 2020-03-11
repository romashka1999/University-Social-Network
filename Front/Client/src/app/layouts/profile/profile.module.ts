import { NgModule } from '@angular/core';

//Components
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
  ],
  imports: [
    RouterModule.forChild([{path: "", component: ProfileComponent}])
  ],
})
export class ProfileModule { }