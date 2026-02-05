import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
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