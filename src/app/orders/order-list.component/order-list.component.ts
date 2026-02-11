import { Component, inject, signal, effect } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../interfaces/order.interface';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmDeleteComponent } from '../../shared/components/confirm-delete/confirm-delete.component';
import { NavigationService } from '../../shared/services/navigation.service';
import { OrderFormComponent } from '../order-form.component/order-form.component';
import { PaginatorComponent} from "../../shared/components/paginator/paginator.component";

@Component({
  selector: 'app-order-list',
  imports: [
    CurrencyPipe, 
    MatIcon, 
    CommonModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule, 
    PaginatorComponent],
  standalone: true,
  templateUrl: './order-list.component.html'
})

export class OrderListComponent {
  private navigationService = inject(NavigationService);
  readonly dialog = inject(MatDialog);
  private orderService = inject(OrderService);
  
  orders = signal<Order[]>([]);
  totalCount = signal(0);
  pagination = signal({ page: 1, limit: 5 });

  constructor() {
    effect(() => {
      const { page, limit } = this.pagination();
      this.fetchData(page, limit);
    });
  }

  private fetchData(page: number, limit: number) {
    this.orderService.getOrders(page, limit).subscribe({
      next: (response) => {
        if (response.success) {
          this.orders.set(response.data.items);
          this.totalCount.set(response.data.totalItems);
        }
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      data: { order: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  updatePagination(newParams: { page: number, limit: number }) {
    this.pagination.set(newParams);
  }

  onDelete(order: Order){
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

  onEdit(id: string) {
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

  loadOrders() {
    const { page, limit } = this.pagination();
    this.fetchData(page, limit);
  }
}