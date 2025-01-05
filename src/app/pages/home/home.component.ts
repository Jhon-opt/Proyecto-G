import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-home',
  standalone: true,  // Asegúrate de que sea standalone
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule],  // Incluir CommonModule en el array de imports
})
export class HomeComponent {
  // Aquí va la lógica de tu componente
}
