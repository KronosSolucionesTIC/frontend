import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TEXTS } from '../../../core/constants/texts';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {
  readonly texts = TEXTS.CONFIRM;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }) {}
}