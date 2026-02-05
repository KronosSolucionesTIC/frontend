import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu} from '../interfaces/menu.interface';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { isPlatformBrowser } from '@angular/common';
import { ENDPOINTS } from '../../core/constants/endpoints';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  menu = signal<Menu[]>([]);

  getMenu() {
    let token = '';
    
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }

    console.log(token);
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<ApiResponse<Menu[]>>(ENDPOINTS.MENU, { headers }).subscribe({
      next: (res) => {
        if (res.success) {
          this.menu.set(res.data); // Actualizamos el signal
        }
      },
      error: (err) => console.error('Error cargando el menú', err)
    });
  }
}