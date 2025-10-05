import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [FormsModule],

  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.email) {
      this.authService.requestCambiarPassword(this.email).subscribe({
        next: (res) => {
          console.log('Respuesta del backend:', res);
          alert('Se ha enviado un correo de recuperación si la dirección es válida.');
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Ocurrió un error al intentar recuperar la contraseña.');
        }
      });
    } else {
      alert('Por favor, introduce un correo válido.');
    }
  }
}
