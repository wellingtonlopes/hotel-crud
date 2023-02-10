import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { ClientInterface, ClientResponse } from '../interfaces/client.interface';
import { MOCKED_CLIENTS_PAGE_1, MOCKED_CLIENTS_PAGE_2 } from '../shared/mock-database';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private clientListPage1: ClientResponse = JSON.parse(MOCKED_CLIENTS_PAGE_1) as ClientResponse;
  private clientListPage2: ClientResponse = JSON.parse(MOCKED_CLIENTS_PAGE_2) as ClientResponse;

  constructor() { }

  public getClients(pageIndex: number): Observable<ClientResponse> {
    return pageIndex === 0 ? from([this.clientListPage1]) : from([this.clientListPage2]);
  }

  public getClientById(id: number): Observable<ClientInterface> {
    let client: ClientInterface = this.clientListPage1.clientList.filter(client => client.clientId === id)[0];

    if (!client) {
      client = this.clientListPage2.clientList.filter(client => client.clientId === id)[0];
    }

    return from([client]);
  }
}
