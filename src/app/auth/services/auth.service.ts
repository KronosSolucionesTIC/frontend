import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../core/constants/endpoints';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { Login } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<ApiResponse<Login>> {
    const body = { username, password };
    return this.http.post<ApiResponse<Login>>(ENDPOINTS.AUTH, body);
  }
}