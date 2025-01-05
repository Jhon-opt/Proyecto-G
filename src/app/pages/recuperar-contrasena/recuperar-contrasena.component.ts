import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [FormsModule],
  
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent {
  email: string = '';

  onSubmit() {
    if (this.email) {
      // Aquí puedes llamar a un servicio para enviar el correo de recuperación
      console.log(`Correo enviado a: ${this.email}`);
      alert('Se ha enviado un correo de recuperación si la dirección es válida.');
    } else {
      alert('Por favor, introduce un correo válido.');
    }
  }
}
