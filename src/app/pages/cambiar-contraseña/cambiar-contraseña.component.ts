import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cambiar-contraseña',
  templateUrl: './cambiar-contraseña.component.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class CambiarPasswordComponent implements OnInit {
  cambiarPasswordForm: FormGroup;
  mensaje: string | null = null;
  tipoMensaje: 'success' | 'error' | null = null;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cambiarPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Capturar token de la URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || null;
      if (!this.token) {
        this.mensaje = 'Token inválido o faltante.';
        this.tipoMensaje = 'error';
      }
    });
  }

  onSubmit(): void {
    if (!this.token) {
      this.mensaje = 'No se puede cambiar la contraseña sin token.';
      this.tipoMensaje = 'error';
      return;
    }

    if (this.cambiarPasswordForm.valid) {
      const nuevaPassword = this.cambiarPasswordForm.value.password;

      this.authService.updatePassword(nuevaPassword, this.token).subscribe({
        next: (res) => {
          this.mensaje = 'Contraseña cambiada con éxito ✅';
          this.tipoMensaje = 'success';
          this.cambiarPasswordForm.reset();
          // Opcional: redirigir al login
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.mensaje = 'Ocurrió un error al actualizar la contraseña.';
          this.tipoMensaje = 'error';
          console.error(err);
        }
      });
    } else {
      this.mensaje = 'Por favor ingresa una contraseña válida.';
      this.tipoMensaje = 'error';
    }
  }
}
