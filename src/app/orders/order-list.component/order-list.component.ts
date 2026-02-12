import { Component, inject, signal, effect } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../interfaces/order.interface';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { ConfirmDeleteComponent } from '../../shared/components/confirm-delete/confirm-delete.component';
import { NavigationService } from '../../shared/services/navigation.service';
import { OrderFormComponent } from '../order-form.component/order-form.component';
import { PaginatorComponent} from "../../shared/components/paginator/paginator.component";
import { TEXTS } from '../../core/constants/texts';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-order-list',
  imports: [
    MatIcon, 
    CommonModule,
    PaginatorComponent,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatGridListModule
  ],
  standalone: true,
  templateUrl: './order-list.component.html'
})

export class OrderListComponent {
  readonly texts = TEXTS.ORDER_LIST;
  private navigationService = inject(NavigationService);
  readonly dialog = inject(MatDialog);
  private orderService = inject(OrderService);
  readonly orders = signal<Order[]>([]);
  readonly totalCount = signal(0);
  readonly pagination = signal({ page: 1, limit: 5 });

  constructor() {
    effect(() => {
      const { page, limit } = this.pagination();
      this.fetchData(page, limit);
    });
  }

  private fetchData(page: number, limit: number): void {
    this.orderService.getOrders(page, limit).subscribe({
      next: (response) => {
        if (response.success) {
          this.orders.set(response.data.items);
          this.totalCount.set(response.data.totalItems);
        }
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      data: { order: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  updatePagination(newParams: { page: number, limit: number }) : void {
    this.pagination.set(newParams);
  }

  onDelete(order: Order) : void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { name: order.nombreCliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.orderService.deleteOrder(order.id).subscribe({
          next: (response) => {
            if (response.success) {
                this.navigationService.openSnackBar(response.message);
                this.loadOrders();
            }
          }
        });
      }
    });
  }

  onEdit(id: string): void {
    const ordenAEditar = this.orders().find(c => c.id === id);

    if (!ordenAEditar) return;

    const dialogRef = this.dialog.open(OrderFormComponent, {
      data: { order: ordenAEditar }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  loadOrders(): void {
    const { page, limit } = this.pagination();
    this.fetchData(page, limit);
  }
}