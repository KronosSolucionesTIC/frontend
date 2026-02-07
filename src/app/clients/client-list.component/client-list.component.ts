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
import { NavigationService } from '../../shared/services/navigation';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
  private navigationService = inject(NavigationService)
  readonly dialog = inject(MatDialog);
  clientes = signal<Client[]>([]);
  private clientService = inject(ClientService);

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (response) => {
        if (response.success) {
          this.clientes.set(response.data); 
        }
      }
    });
  }

  openDialog() {
    this.dialog.open(ClientFormComponent, {
      data: { client: null }
    });
  }

  onDelete(client: Client){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { name: client.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.clientService.deleteClient(client.id).subscribe({
          next: (response) => {
            if (response.success) {
              const snackRef = this.navigationService.openSnackBar(response.message);
              snackRef.afterDismissed().subscribe(() => {
                this.navigationService.reloadPage();
              });
            }
          }
        });
      }
    });
  }

  onEdit(id: string){
    console.log(['id a editar', id])
  }
}