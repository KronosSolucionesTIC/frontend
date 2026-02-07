import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  readonly _snackBar = inject(MatSnackBar);

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
}