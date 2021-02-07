import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ServerReponse } from 'src/app/shared/server-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private readonly url = environment.url + '/backOffice/admins';

  constructor(private readonly http: HttpClient) { }

  public getAdmins(): Observable<ServerReponse> {
    return this.http.get<ServerReponse>(this.url);
  }

  public getAdmin(id: number): Observable<ServerReponse> {
    return this.http.get<ServerReponse>(`${this.url}/${id}`);
  }

  public createAdmin(adminCreateDto: any): Observable<ServerReponse> {
    return this.http.post<ServerReponse>(this.url, adminCreateDto);
  }

  public updateAdmin(id: number, adminUpdateDto: any): Observable<ServerReponse> {
    return this.http.put<ServerReponse>(this.url + `/${id}`, adminUpdateDto);
  }

  public deleteAdmin(id: number): Observable<ServerReponse> {
    return this.http.delete<ServerReponse>(this.url + `/${id}`);
  }
}
