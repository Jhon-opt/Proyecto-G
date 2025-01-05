import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta
import { RegisterResponse } from '../models/sing-up-response/Register-Response'; // Importa la respuesta de registro

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule], // Importa CommonModule aquí
})
export class CrearCuentaComponent {
  crearCuentaForm: FormGroup;
  mensaje: string = '';
  tipoMensaje: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.crearCuentaForm = this.fb.group({
      nombre: ['', Validators.required],  // Añadir campo 'nombre'
    
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.crearCuentaForm.valid) {
      const {  nombre, email, password } = this.crearCuentaForm.value;

      this.authService.register({ nombre, email, password }).subscribe({
        next: (response: RegisterResponse) => {
          if (response.success) {
            this.mensaje = 'Usuario creado exitosamente.';
            this.tipoMensaje = 'success';
            this.crearCuentaForm.reset(); // Limpia el formulario
          } else {
            this.mensaje = response.message || 'Ocurrió un error al crear el usuario.';
            this.tipoMensaje = 'error';
          }
        },
        error: (err) => {
          console.error('Error al crear la cuenta:', err);
          this.mensaje = 'Error al crear la cuenta: ' + err.message;
          this.tipoMensaje = 'error';
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
