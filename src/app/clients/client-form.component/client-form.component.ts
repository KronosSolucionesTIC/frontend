import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { ClientService } from '../services/client.service';
import { NavigationService } from '../../shared/services/navigation';

@Component({
  selector: 'app-client-form.component',
imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
})

export class ClientFormComponent {
  readonly dialogRef = inject(MatDialogRef<Dialog>);
  readonly clientService = inject(ClientService);
  readonly navigationService = inject(NavigationService);
  readonly enviado = signal(false);
  readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.clientService.createClient(this.form.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.onCancel();
          const snackRef = this.navigationService.openSnackBar('Cliente creado correctamente');
          snackRef.afterDismissed().subscribe(() => {
            this.navigationService.reloadPage();
          });
        }
      }
    });      
  }

  onCancel() {
    this.form.reset();
    this.dialogRef.close();
  }
}
