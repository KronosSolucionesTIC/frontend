import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { Client } from '../intefaces/client.interface';
import { ENDPOINTS } from '../../core/constants/endpoints';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  getClients(): Observable<ApiResponse<Client[]>> {
    let token = '';
    
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ApiResponse<Client[]>>(ENDPOINTS.CLIENTS.GET, { headers });
  }
}