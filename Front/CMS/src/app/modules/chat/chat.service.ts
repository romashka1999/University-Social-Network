import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ServerReponse } from 'src/app/shared/server-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly url = environment.url + '/backOffice/adminChat';

  constructor(private readonly http: HttpClient) { }

  public getChatMessages(page: number, pageSize: number): Observable<ServerReponse> {
    return this.http.get<ServerReponse>(`${this.url}?page=${page}&pageSize=${pageSize}`);
  }

  public sendMessageToChat(messageCreateDto: {content: string}): Observable<ServerReponse> {
    return this.http.post<ServerReponse>(this.url, messageCreateDto);
  }

}
