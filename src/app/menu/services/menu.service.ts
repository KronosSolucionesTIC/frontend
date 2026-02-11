import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu} from '../interfaces/menu.interface';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { ENDPOINTS } from '../../core/constants/endpoints';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private http = inject(HttpClient);

  menu = signal<Menu[]>([]);

  getMenu() {
    this.http.get<ApiResponse<Menu[]>>(ENDPOINTS.MENU).subscribe({
      next: (res) => {
        if (res.success) {
          this.menu.set(res.data);
        }
      },
      error: (err) => console.error('Error cargando el menú', err)
    });
  }
}