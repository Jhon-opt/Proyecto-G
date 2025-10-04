// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
// import { importProvidersFrom } from '@angular/core';
// import { LoginComponent } from './auth/login/login.component';
// import { HomeComponent } from './pages/home/home.component';
// import { AuthGuard } from './services/AuthGuard';
// import { LandingComponent } from './components/landing/landing.component';
// import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';
// import { InformacionProyectoComponent } from './pages/informacion-proyecto/informacion-proyecto.component';
// import { EnlacesComponent } from './pages/enlaces/enlaces.component';
// import { GraficasSensoresComponent } from './graficas-sensores/graficas-sensores.component';
// import { EnlacesVideosComponent } from './pages/enlaces/enlaces-videos/enlaces-videos.component';
// import { EnlacesDocumentosComponent } from './pages/enlaces/enlaces-documentos/enlaces-documentos.component';
// import { EnlacesPaginasComponent } from './pages/enlaces/enlaces-paginas/enlaces-paginas.component';

// const routes: Routes = [
//   { path: '', component: LandingComponent },
//   { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'crear-cuenta', loadComponent: () => import('./crear-cuenta/crear-cuenta.component').then(m => m.CrearCuentaComponent) },
//   { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),canActivate: [AuthGuard] }, // Importa el HomeComponent aquí
//   { path: 'recuperar-contraseña', component: RecuperarContrasenaComponent },
//   { path: 'informacion-proyecto', component: InformacionProyectoComponent },
//   { path: 'enlaces', component: EnlacesComponent },
//   {path: 'enlaces-videos', component: EnlacesVideosComponent},
//   {path: 'enlaces-paginas', component: EnlacesPaginasComponent},
//   {path: 'enlaces-documentos', component: EnlacesDocumentosComponent},
//   { path: 'graficas-sensores', component: GraficasSensoresComponent },
//   { path: '**', redirectTo: 'login' },
// ];


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}

