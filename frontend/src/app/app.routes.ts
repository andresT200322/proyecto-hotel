import { Routes } from '@angular/router';
import { Inicio } from './vistas/inicio/inicio';
import { Usuarios } from './vistas/usuarios/usuarios';
import { Login } from './vistas/login/login';
import { Reservas } from './vistas/reservas/reservas';
import { Masdenosotros } from './vistas/masdenosotros/masdenosotros';
import { TablaComponent } from './vistas/tabla/tabla.component';

export const routes: Routes = [
  { path: '', component: Inicio, pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'usuarios', component: Usuarios },
  { path: 'reservas', component: Reservas },
  { path: 'tabla', component: TablaComponent },
  { path: 'nosotros', component: Masdenosotros },
  { path: '**', redirectTo: '' },
];
