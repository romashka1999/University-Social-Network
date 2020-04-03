import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { TranslationCreateDto } from './translations.interfaces';


@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  private readonly url = environment.url + '/translations';

  constructor(private readonly http: HttpClient) {}

  public createTranslation(translationCreateDto: TranslationCreateDto): Observable<any> {
    console.log(translationCreateDto);
    return this.http.post(this.url , translationCreateDto, {
        responseType: 'json',
        observe: 'response' // what kind of data we want to get, from server
    });
  }
}
