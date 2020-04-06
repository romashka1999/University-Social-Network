import {Injectable, Inject} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _languages = ['', 'en', 'ka', 'ru'];
  private defaultLang = 'en';

  get languageId() {
    return this._languages.findIndex(l => l == this.language);
  }

  constructor() {
    this.set(this.getLangNameFromUrl());
  }

  private _language$ = new BehaviorSubject<string>(this.defaultLang);

  private getLangNameFromUrl() {
    try {
      let l = location.pathname.split('/')[2];
      if (!l) {
        return this.defaultLang;
      }

      return l;
    } catch (er) {
      return this.defaultLang;
    }
  }

  get language() {
    return this._language$.getValue();
  }

  get language$(): Observable<string> {
    return this._language$.asObservable();
  }

  set(code: string) {
    this._language$.next(code);
  }

}
