import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


import { TranslationsService } from './translations.service';
import { Subscription } from 'rxjs';
import { Translation } from './translations.interfaces';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit, OnDestroy {

  // private subscriptions: Subscription[];
  private getTranslationsSub: Subscription;
  private createTRanslationSub: Subscription;
  private updateTranslaionSub: Subscription;
  private deleteTranslationSub: Subscription;

  public translationsAddForm: FormGroup;
  public transltaions: Translation[];

  constructor(
    private readonly translationsService: TranslationsService,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTranslationsSub = this.translationsService.getTranslations().subscribe((res) => {
      if (res) {
        this.transltaions = res.data;
      }
    })
    this.translationsAddForm = new FormGroup({
      variable: new FormControl(null, Validators.required),
      KA: new FormControl(null, Validators.required),
      EN: new FormControl(null, Validators.required),
      RU: new FormControl(null, Validators.required)
    });
  }

  onAddTranslation() {
    const translationCreateDto = this.translationsAddForm.value;
    const durationTime = 4000;

    this.createTRanslationSub = this.translationsService.createTranslation(translationCreateDto).subscribe((res) => {
        this.snackBar.open(res.message, 'dismiss', { duration: durationTime });
        this.transltaions.push(res.data);
        // this.snackBar.openFromComponent(ResponseSnackBarComponent, {duration: duurationTime})
      console.log(res);
    }, (err) => {

    });
  }

  onUpdateTranslation(translation: Translation) {
    const id = translation.id;
    const updatedTranslation = this.transltaions.find(translation => translation.id === id);
    console.log(updatedTranslation);
    const durationTime = 4000;
    let snackBarRef: any;
    this.updateTranslaionSub = this.translationsService.updateTranslationById(id, {}).subscribe((res: any) => {
      if (res) {
        snackBarRef = this.snackBar.openFromComponent(ResponseSnackBarComponent, { duration: durationTime });
      }
    })

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('snack bar dismissed');
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('action triggered');
    })

  }

  onDeleteTranslation(id: number) {
    const durationTime = 4000;
    this.deleteTranslationSub = this.translationsService.deleteTranslationById(id).subscribe((res: any) => {
      if (res) {
        this.snackBar.open(res.message, 'dismiss', { duration: durationTime });
        this.transltaions = this.transltaions.filter(translation => translation.id !== id);
      }
    })
  }

  ngOnDestroy() {
    try {
      this.getTranslationsSub.unsubscribe();
      this.createTRanslationSub.unsubscribe();
      this.updateTranslaionSub.unsubscribe();
      this.deleteTranslationSub.unsubscribe();
    } catch (error) {

    }

    // this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

}
