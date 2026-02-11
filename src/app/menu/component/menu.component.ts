import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuService } from '../services/menu.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientListComponent } from "../../clients/client-list.component/client-list.component";
import { OrderListComponent } from '../../orders/order-list.component/order-list.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatTabsModule, ClientListComponent, ClientListComponent, OrderListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,  
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