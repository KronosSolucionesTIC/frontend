import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para el *ngFor
import { ClientService } from '../services/client.service';
import { Client } from '../intefaces/client.interface';
import {
  MatDialog
} from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form.component/client-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  clientes = signal<Client[]>([]);
  private clientService = inject(ClientService);

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (response) => {
        if (response.success) {
          // Así se actualiza un signal
          this.clientes.set(response.data); 
          console.log('Signal actualizado con:', this.clientes());
        }
      }
    });
  }

  openDialog() {
    this.dialog.open(ClientFormComponent, {
      data: { client: null } // Pasas datos vacíos para crear
    });
  }
}