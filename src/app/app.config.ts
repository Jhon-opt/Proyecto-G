import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/AuthGuard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent) },
      { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'crear-cuenta', loadComponent: () => import('./crear-cuenta/crear-cuenta.component').then(m => m.CrearCuentaComponent) },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard]
      },
      { path: 'recuperar-contraseña', loadComponent: () => import('./pages/recuperar-contrasena/recuperar-contrasena.component').then(m => m.RecuperarContrasenaComponent) },
      { path: 'informacion-proyecto', loadComponent: () => import('./pages/informacion-proyecto/informacion-proyecto.component').then(m => m.InformacionProyectoComponent) },
      { path: 'enlaces', loadComponent: () => import('./pages/enlaces/enlaces.component').then(m => m.EnlacesComponent) },
      { path: 'enlaces-videos', loadComponent: () => import('./pages/enlaces/enlaces-videos/enlaces-videos.component').then(m => m.EnlacesVideosComponent) },
      { path: 'enlaces-paginas', loadComponent: () => import('./pages/enlaces/enlaces-paginas/enlaces-paginas.component').then(m => m.EnlacesPaginasComponent) },
      { path: 'enlaces-documentos', loadComponent: () => import('./pages/enlaces/enlaces-documentos/enlaces-documentos.component').then(m => m.EnlacesDocumentosComponent) },
      {
        path: 'graficas-sensores',
        loadComponent: () => import('./graficas-sensores/graficas-sensores.component').then(m => m.GraficasSensoresComponent),
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'descargar-datos',
      //   loadComponent: () => import('./descargarDatos/descargarDatos.component').then(m => m.DescargarDatosComponent),
      //   canActivate: [AuthGuard]
      // },

      {
        path: 'cambiar-contraseña',loadComponent: () => import('./pages/cambiar-contraseña/cambiar-contraseña.component').then(m => m.CambiarPasswordComponent),
      },
      { path: '**', redirectTo: 'login' },
    ]),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    AuthService,
    AuthGuard
  ]
};
