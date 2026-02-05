import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuService } from '../services/menu.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule, 
    MatIconModule, 
    RouterLink, 
    RouterLinkActive, 
    MatProgressSpinnerModule, 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  // Inyectamos el servicio
  private menuService = inject(MenuService);
  
  // Exponemos el signal al template
  menuItems = this.menuService.menu;

  ngOnInit() {
    this.menuService.getMenu();
  }
}