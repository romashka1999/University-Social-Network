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
 } from '@angular/material';

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
  MatIconModule
];

@NgModule({
  imports: [materials],
  entryComponents: [],
  exports: [materials]
})
export class MaterialModule { }
