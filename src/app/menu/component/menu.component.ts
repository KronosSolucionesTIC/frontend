import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientListComponent } from "../../clients/client-list.component/client-list.component";
import { OrderListComponent } from '../../orders/order-list.component/order-list.component';
import { TEXTS } from '../../core/constants/texts';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatCardModule,
    MatTabsModule, 
    ClientListComponent, 
    OrderListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,  
  templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit {
  private menuService = inject(MenuService);
  menuItems = this.menuService.menu;
  readonly texts = TEXTS.MENU;

  ngOnInit(): void {
    this.menuService.getMenu();
  }
}