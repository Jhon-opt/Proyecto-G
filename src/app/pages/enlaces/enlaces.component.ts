import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enlaces',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enlaces.component.html',
  styleUrls: ['./enlaces.component.css']
})
export class EnlacesComponent {
  constructor(private router: Router, public authService: AuthService) {}

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
