import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  userData = {
    username: '',
    password: ''
  };

  onLogin() {
    this.authService.login(this.userData.username, this.userData.password).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Token recibido:', response.data.token);
          // Aquí puedes guardar el token en localStorage o redirigir
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/menu']);
        }
      },
      error: (err) => {
        console.error('Error en el login', err);
        alert('Credenciales incorrectas');
      }
    });
  }
}
