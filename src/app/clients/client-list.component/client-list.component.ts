import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../services/client.service';
import { Client } from '../intefaces/client.interface';
import {
  MatDialog
} from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form.component/client-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDeleteComponent } from '../../shared/components/confirm-delete/confirm-delete.component';
import { NavigationService } from '../../shared/services/navigation.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { TEXTS } from '../../core/constants/texts';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatGridListModule,
    MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
  private navigationService = inject(NavigationService)
  readonly dialog = inject(MatDialog);
  private clientService = inject(ClientService);
  clients = signal<Client[]>([]);  
  readonly texts = TEXTS.CLIENT_LIST;

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (response) => {
        if (response.success) {
          this.clients.set(response.data); 
        }
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: { client: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients();
      }
    });
  }

  onDelete(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { name: client.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.clientService.deleteClient(client.id).subscribe({
          next: (response) => {
            if (response.success) {
                this.navigationService.openSnackBar(response.message);
                this.loadClients();
            }
          }
        });
      }
    });
  }

  onEdit(id: string): void {
    const clienteAEditar = this.clients().find(c => c.id === id);

    if (!clienteAEditar) return;

    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: { client: clienteAEditar }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients();
      }
    });
  }

  loadClients() : void {
    this.clientService.getClients().subscribe({
      next: (response) => {
        if (response.success) {
          this.clients.set(response.data);
        }
      }
    });
  }
}