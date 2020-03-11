import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modules
import { LayoutsRoutingModule } from './layouts-router.module'

//Components
import { LayoutsComponent } from './layouts.component';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    LayoutsComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [LayoutsComponent]
})
export class LayoutsModule { }
