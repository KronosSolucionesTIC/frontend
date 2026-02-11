import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { Client, CreateClientRequest } from '../intefaces/client.interface';
import { ENDPOINTS } from '../../core/constants/endpoints';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private http = inject(HttpClient);

  selectedClient = signal<Client | null>(null);

  getClients(): Observable<ApiResponse<Client[]>> {
    return this.http.get<ApiResponse<Client[]>>(ENDPOINTS.CLIENTS.GET);
  }

  createClient(client: CreateClientRequest) {
    return this.http.post<ApiResponse<Client>>(ENDPOINTS.CLIENTS.CREATE, client);
  }

  updateClient(id: number, client: Client) {
    const url = `${ENDPOINTS.CLIENTS.UPDATE}/${id}`;
    return this.http.put<ApiResponse<Client>>(url, client);
  }

  deleteClient(id: string) {
    const url = `${ENDPOINTS.CLIENTS.DELETE}/${id}`;
    return this.http.delete<ApiResponse<Client>>(url);
  }
}