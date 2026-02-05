import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para el *ngFor
import { ClientService } from '../services/client.service';
import { Client } from '../intefaces/client.interface';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
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
}