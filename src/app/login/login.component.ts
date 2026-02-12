import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TEXTS } from '../core/constants/texts';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly texts = TEXTS.LOGIN;

  userData = {
    username: '',
    password: ''
  };

  onLogin(): void {
    this.authService.login(this.userData.username, this.userData.password).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/menu']);
        }
      },
      error: () => {
        alert(this.texts.ERROR);
      }
    });
  }
}
