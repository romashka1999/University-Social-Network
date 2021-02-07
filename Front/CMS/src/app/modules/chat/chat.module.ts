import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {path: '', component: ChatComponent}
];

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    NgxSpinnerModule
  ]
})
export class ChatModule { }
