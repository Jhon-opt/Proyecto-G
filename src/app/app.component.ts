import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoggedIn: boolean = false;
  inactivityTime: number = 0;
  maxInactivityTime: number = 1800;

  constructor(private authService: AuthService) {}

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event): void {
    this.authService.logout();
  }

  @HostListener('document:mousemove', ['$event'])
  resetInactivityTimer(): void {
    this.inactivityTime = 0;
  }

  @HostListener('document:keydown', ['$event'])
  resetInactivityTimerOnKey(event: KeyboardEvent): void {
    this.inactivityTime = 0;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.checkAuthentication();
    if (this.authService.isLoggedIn()) {
      this.startInactivityTimer();
    }
  }

  startInactivityTimer(): void {
    setInterval(() => {
      this.inactivityTime++;
      if (this.inactivityTime >= this.maxInactivityTime) {
        this.authService.logout();
      }
    }, 1000);
  }
}
