import { Component, signal } from '@angular/core';
import { NavegacionComponent } from './vistas/navegacion.component';

@Component({
  imports: [NavegacionComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('hotel');
}
