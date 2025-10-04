import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-enlaces-videos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enlaces-videos.component.html',

})
export class EnlacesVideosComponent {
  constructor(public authService: AuthService) {}
}
