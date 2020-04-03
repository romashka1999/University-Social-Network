import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseSnackBarComponent } from './response-snack-bar/response-snack-bar.component';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [
    ResponseSnackBarComponent
  ],
  entryComponents: [
    ResponseSnackBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule
  ]
})
export class SharedModule { }
