import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslationsService } from './translations.service';
import { MatSnackBar } from '@angular/material';
import { ResponseSnackBarComponent } from 'src/app/shared/response-snack-bar/response-snack-bar.component';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit {

  translationsAddForm: FormGroup

  constructor(
    private readonly translationsService: TranslationsService,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
    this.translationsAddForm = new FormGroup({
      variable: new FormControl(null, Validators.required),
      KA: new FormControl(null, Validators.required),
      EN: new FormControl(null, Validators.required),
      RU: new FormControl(null, Validators.required)
    })
  }

  onAddTranslation() {
    const translationCreateDto = this.translationsAddForm.value;

    this.translationsService.createTranslation(translationCreateDto).subscribe( (res) => {
      console.log(res);
    })
  }

  onSave() {
    const action = 'dismiss';
    const duurationTime = 2000;
    const snackBarRef =  this.snackBar.openFromComponent(ResponseSnackBarComponent, {duration: duurationTime})

    snackBarRef.afterDismissed().subscribe( ()=> {
      console.log('snack bar dismissed');
    });

    snackBarRef.onAction().subscribe( () => {
      console.log('action triggered');
    })

  }

}
