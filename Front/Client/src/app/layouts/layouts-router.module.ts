import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
    {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
    //{path: 'profile', component: ProfileComponent},
    {path: "", component: LayoutsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
