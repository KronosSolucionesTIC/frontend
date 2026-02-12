import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  readonly _snackBar = inject(MatSnackBar);
  private platformId = inject(PLATFORM_ID);

  constructor() { }

  openSnackBar(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message, 'Cerrar', {
        duration: 3000
      });
  }

  buildHeaders() : HttpHeaders {
    const token = this.getToken();    
    const headers = this.getHeaders(token);

    return headers;
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
}