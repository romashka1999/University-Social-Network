import { NgModule } from '@angular/core';
import { 
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatSelectModule, MatCheckboxModule, MatRadioModule, 
  MatDatepickerModule, MatNativeDateModule, MatSidenavModule, 
  MatMenuModule, MatListModule, MatBadgeModule, 
  MatProgressSpinnerModule, MatToolbarModule, MatDividerModule, 
  MatExpansionModule, MatCardModule, MatTabsModule, MatStepperModule, 
  MatDialogModule,
  MatIconModule,
  MatSnackBarModule,
 } from '@angular/material';

 import { ScrollingModule } from '@angular/cdk/scrolling';
 

const materials = [
  MatButtonModule,
  MatBadgeModule, 
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatExpansionModule,
  MatCardModule,
  MatTabsModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatIconModule,
  MatSnackBarModule,
  ScrollingModule
];

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule { }
