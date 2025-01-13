import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enlaces',
  standalone: false,
  
  templateUrl: './enlaces.component.html',
  styleUrl: './enlaces.component.css'
})
export class EnlacesComponent {
  constructor(private router: Router, public authService: AuthService) {}
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
