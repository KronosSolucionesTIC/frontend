import { Component, inject, signal, OnInit, input, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { NavigationService } from '../../shared/services/navigation.service';
import { OrderService } from '../services/order.service';
import { Client } from '../../clients/intefaces/client.interface';
import { ClientService } from '../../clients/services/client.service';
import { Order } from '../interfaces/order.interface';
import { TEXTS } from '../../core/constants/texts';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
],
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit {
  readonly form: FormGroup;  
  readonly texts = TEXTS.ORDERS;
  readonly dialogRef = inject(MatDialogRef<Dialog>);
  readonly orderService = inject(OrderService);
  readonly clientService = inject(ClientService);
  readonly navigationService = inject(NavigationService);
  readonly data = inject<{ order: Order }>(MAT_DIALOG_DATA, { optional: true });
  readonly isEditMode = signal(!!this.data?.order);
  readonly clients = signal<Client[]>([]); 
  readonly initialData = input<Order | null>(null);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      clientId: [this.data?.order?.idCliente || '', [Validators.required]],
      totalAmount: [this.data?.order?.total || 0, [Validators.required, Validators.min(0.01)]]
    });
    
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.isEditMode.set(true);
        this.form.patchValue(data);
      }
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (response) => {
        if (response.success) {
          this.clients.set(response.data);
        }
      }
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const request = this.isEditMode() 
      ? this.orderService.updateOrder(this.data!.order.id, this.form.value)
      : this.orderService.createOrder(this.form.value);

    request.subscribe({
      next: (response: { success: boolean; }) => {
        if (response.success) {
          const accion = this.isEditMode() ? 'actualizada' : 'creada';
          this.navigationService.openSnackBar(`Orden ${accion} correctamente`);
          this.dialogRef.close(true);
        }
      }
    });  
  }

  onCancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }
}