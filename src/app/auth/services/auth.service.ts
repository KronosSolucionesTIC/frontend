import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../core/constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(ENDPOINTS.AUTH, body);
  }
}