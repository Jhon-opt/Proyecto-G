import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-enlaces-paginas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enlaces-paginas.component.html',

})
export class EnlacesPaginasComponent {
  constructor(public authService: AuthService) {}
}
