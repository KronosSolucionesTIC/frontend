import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { ClientService } from '../services/client.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { Client } from '../intefaces/client.interface';
import { TEXTS } from '../../core/constants/texts';

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
  readonly form: FormGroup;
  readonly data = inject<{ client: Client }>(MAT_DIALOG_DATA, { optional: true });
  readonly isEditMode = signal(!!this.data?.client);
  readonly texts = TEXTS.CLIENTS;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [this.data?.client?.name || '', [Validators.required, Validators.minLength(3)]],
      email: [this.data?.client?.email || '', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const request = this.isEditMode() 
      ? this.clientService.updateClient(this.data!.client.id, this.form.value)
      : this.clientService.createClient(this.form.value);

    request.subscribe({
      next: (response: { success: boolean; }) => {
        if (response.success) {
          const action = this.isEditMode() ? this.texts.UPDATED : this.texts.CREATED;
          this.navigationService.openSnackBar(this.texts.SUCCESS_MESSAGE(action));
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
