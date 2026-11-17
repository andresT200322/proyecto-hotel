import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.html',
  styleUrl: './tarjeta.css',
})
export class Tarjeta {
  @Input() titulo = '';
  @Input() descripcion = '';
  @Input() imagenes: string[] = [];
}
