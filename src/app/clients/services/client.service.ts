import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { Client, CreateClientRequest } from '../intefaces/client.interface';
import { ENDPOINTS } from '../../core/constants/endpoints';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private clients = signal<Client[]>([]);

  selectedClient = signal<any | null>(null);

  getClients(): Observable<ApiResponse<Client[]>> {
    const headers = this.buildHeaders();
    return this.http.get<ApiResponse<Client[]>>(ENDPOINTS.CLIENTS.GET, { headers });
  }

  createClient(client: CreateClientRequest) {
    const headers = this.buildHeaders();
    return this.http.post<ApiResponse<Client[]>>(ENDPOINTS.CLIENTS.CREATE, client, { headers });
  }

  updateClient(id: number, client: Client) {
    const headers = this.buildHeaders();
    const url = `${ENDPOINTS.CLIENTS.UPDATE}/${id}`;
    return this.http.put<ApiResponse<Client[]>>(url, client, { headers });
  }

  deleteClient(id: string) {
    const headers = this.buildHeaders();
    const url = `${ENDPOINTS.CLIENTS.DELETE}/${id}`;
    return this.http.delete<ApiResponse<Client[]>>(url, { headers });
  }

  private getToken(): string {
    let token = '';
    
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }

    return token;
  }

  private getHeaders(token: string) : HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private buildHeaders() : HttpHeaders {
    const token = this.getToken();    
    const headers = this.getHeaders(token);

    return headers;
  }
}