import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { TranslationCreateDto, TranslationUpdateDto } from './translations.interfaces';


@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  private readonly url = environment.url + '/backOffice/translations';

  constructor(private readonly http: HttpClient) { }

  public getTranslations(): Observable<any> {
    return this.http.get(this.url);
  }

  public createTranslation(translationCreateDto: TranslationCreateDto): Observable<any> {
    return this.http.post(this.url, translationCreateDto);
  }

  public updateTranslationById(id: number, translationUpdateDto: TranslationUpdateDto) {
    return this.http.put(this.url + `/${id}`, translationUpdateDto);
  }

  public deleteTranslationById(id: number) {
    return this.http.delete(this.url + `/${id}`);
  }
}
