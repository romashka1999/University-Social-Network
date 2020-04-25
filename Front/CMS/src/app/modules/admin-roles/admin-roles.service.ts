import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ServerReponse } from 'src/app/shared/server-response.interface';


@Injectable({
  providedIn: 'root'
})
export class AdminRolesService {

  private readonly url = environment.url + '/backOffice/adminRoles';

  constructor(private readonly http: HttpClient) { }

  public getAdminRoles(): Observable<ServerReponse> {
    return this.http.get<ServerReponse>(this.url);
  }

  public getAdminRole(id: number): Observable<ServerReponse> {
    return this.http.get<ServerReponse>(`${this.url}/${id}`);
  }

  public createAdminRole(adminRoleCreateDto: any): Observable<ServerReponse> {
    return this.http.post<ServerReponse>(this.url, adminRoleCreateDto);
  }

  public updateAdminRole(id: number, adminRoleUpdateDto: any): Observable<ServerReponse> {
    return this.http.put<ServerReponse>(this.url + `/${id}`, adminRoleUpdateDto);
  }

  public deleteAdminRole(id: number): Observable<ServerReponse> {
    return this.http.delete<ServerReponse>(this.url + `/${id}`);
  }

  public getAdminRolePermissions(): Observable<ServerReponse> {
    return this.http.get<ServerReponse>(`${environment.url}/backOffice/adminPermissions`);
  }
}
