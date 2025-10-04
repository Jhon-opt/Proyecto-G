import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-enlaces-documentos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enlaces-documentos.component.html',
 
})
export class EnlacesDocumentosComponent {
  constructor(public authService: AuthService) {}

  onBackClick(event: Event) {
    event.preventDefault();
    console.log("Botón Volver presionado ✅");
  }
}
