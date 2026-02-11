import { Component, inject, signal, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { NavigationService } from '../../shared/services/navigation';
import { OrderService } from '../services/order.service';
import { Client } from '../../clients/intefaces/client.interface';
import { ClientService } from '../../clients/services/client.service';

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
  readonly dialogRef = inject(MatDialogRef<Dialog>);
  readonly orderService = inject(OrderService);
  readonly clientService = inject(ClientService);
  readonly navigationService = inject(NavigationService);
  readonly enviado = signal(false);
  readonly form: FormGroup;
  readonly data = inject<{ order: any }>(MAT_DIALOG_DATA, { optional: true });
  readonly isEditMode = signal(!!this.data?.order);
  clients = signal<Client[]>([]); 

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      clientId: [this.data?.order?.idCliente || '', [Validators.required]],
      totalAmount: [this.data?.order?.total || 0, [Validators.required, Validators.min(0.01)]]
    });
  }

  @Input() set initialData(order: any) {
    if (order) {
      this.isEditMode.set(true);
      this.form.patchValue(order);
    }
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(){
    this.clientService.getClients().subscribe({
      next: (response) => {
        if (response.success) {
          this.clients.set(response.data);
        }
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const request = this.isEditMode() 
      ? this.orderService.updateOrder(this.data!.order.id, this.form.value)
      : this.orderService.createOrder(this.form.value);

    request.subscribe({
      next: (response: { success: any; }) => {
        if (response.success) {
          const accion = this.isEditMode() ? 'actualizada' : 'creada';
          this.navigationService.openSnackBar(`Orden ${accion} correctamente`);
          this.dialogRef.close(true);
        }
      }
    });  
  }

  onCancel() {
    this.form.reset();
    this.dialogRef.close();
  }
}