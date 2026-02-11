import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  readonly _snackBar = inject(MatSnackBar);
  private platformId = inject(PLATFORM_ID);

  constructor() { }

  /**
   * Refresca la página completa (Hard Refresh)
   */
  reloadPage(): void {
    window.location.reload();
  }

  /**
   * Regresa a la página anterior en el historial del navegador
   */
  goBack(): void {
    window.history.back();
  }

  openSnackBar(message: string) {
    return this._snackBar.open(message, 'Cerrar', {
        duration: 2000
      });
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

  buildHeaders() : HttpHeaders {
    const token = this.getToken();    
    const headers = this.getHeaders(token);

    return headers;
  }
}