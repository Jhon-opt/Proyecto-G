import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../../services/AuthGuard';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLandingPage: boolean = false;

  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, public AuthGuard: AuthGuard) {}

  ngOnInit(): void {
    // Detectar si estamos en la página de inicio
    this.router.events.subscribe(() => {
      this.isLandingPage = this.router.url === '/'; // Compara la ruta actual con '/'
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
