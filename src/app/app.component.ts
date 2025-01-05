import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Asegúrate de usar `styleUrls` (en plural)
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn: boolean = false;
  inactivityTime: number = 0;
  maxInactivityTime: number = 1800; // 30 minutos

  constructor(private authService: AuthService) {}

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event): void {
    this.authService.logout(); // Cierra sesión al cerrar la página
  }

  @HostListener('document:mousemove', ['$event'])
  resetInactivityTimer(): void {
    this.inactivityTime = 0; // Resetea el temporizador de inactividad
  }

  @HostListener('document:keydown', ['$event'])
  resetInactivityTimerOnKey(event: KeyboardEvent): void {
    this.inactivityTime = 0; // Resetea el temporizador de inactividad
  }

  ngOnInit(): void {
    // Verificar si el usuario está autenticado al cargar la página
    this.isLoggedIn = this.authService.checkAuthentication();
    // Verificar si el usuario está logueado
    if (this.authService.isLoggedIn()) {
      this.startInactivityTimer();
    }
  }

  startInactivityTimer(): void {
    setInterval(() => {
      this.inactivityTime++;
      if (this.inactivityTime >= this.maxInactivityTime) {
        this.authService.logout(); // Cierra sesión si el usuario está inactivo por más de 30 minutos
      }
    }, 1000);
  }}
