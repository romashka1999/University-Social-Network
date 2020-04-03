import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { TranslationsComponent } from './translations.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseSnackBarComponent } from 'src/app/shared/response-snack-bar/response-snack-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {path: '', component: TranslationsComponent}
]

@NgModule({
  declarations: [TranslationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TranslationsModule { }
