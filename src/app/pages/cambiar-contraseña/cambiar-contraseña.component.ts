import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
selector: 'cambiar-contraseña',
templateUrl: './cambiar-contraseña.component.html',
imports: [ReactiveFormsModule, CommonModule,]
})
export class CambiarPasswordComponent {
cambiarPasswordForm: FormGroup;
mensaje: string | null = null;
tipoMensaje: 'success' | 'error' | null = null;

constructor(private fb: FormBuilder) {
this.cambiarPasswordForm = this.fb.group({
password: ['', [Validators.required, Validators.minLength(6)]]
});
}

onSubmit(): void {
if (this.cambiarPasswordForm.valid) {
const nuevaPassword = this.cambiarPasswordForm.value.password;


  // Aquí puedes hacer la lógica de servicio HTTP para cambiar la contraseña
  console.log('Nueva contraseña:', nuevaPassword);

  this.mensaje = 'Contraseña cambiada con éxito ✅';
  this.tipoMensaje = 'success';
  this.cambiarPasswordForm.reset();
} else {
  this.mensaje = 'Por favor ingresa una contraseña válida.';
  this.tipoMensaje = 'error';
}


}
}
