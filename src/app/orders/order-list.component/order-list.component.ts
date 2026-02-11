import { Component, inject, signal, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../interfaces/order.interface';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmDeleteComponent } from '../../shared/components/confirm-delete/confirm-delete.component';
import { NavigationService } from '../../shared/services/navigation';
import { OrderFormComponent } from '../order-form.component/order-form.component';

@Component({
  selector: 'app-order-list',
  imports: [CurrencyPipe, MatIcon, CommonModule,CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  standalone: true,
  templateUrl: './order-list.component.html'
})

export class OrderListComponent implements OnInit {
  private navigationService = inject(NavigationService);
  readonly dialog = inject(MatDialog);
  private orderService = inject(OrderService);  
  
  orders = signal<Order[]>([]);
  totalCount = signal(0);

  ngOnInit() {
    this.loadOrders();
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
    console.log(['id', id]);
    const ordenAEditar = this.orders().find(c => c.id === id);

    console.log(['ordenAEditar', ordenAEditar]);
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
    this.orderService.getOrders(1, 10).subscribe({
      next: (response) => {
        if (response.success) {
          this.orders.set(response.data.items);
          this.totalCount.set(response.data.totalItems);
        }
      }
    });
  }
}