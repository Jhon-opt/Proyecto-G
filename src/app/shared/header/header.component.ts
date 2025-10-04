import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../services/AuthGuard';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLandingPage: boolean = false;

  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, public AuthGuard: AuthGuard) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isLandingPage = this.router.url === '/';
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
