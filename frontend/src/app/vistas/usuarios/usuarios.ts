import { Component } from '@angular/core';
import { AsyncPipe, NgFor, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [AsyncPipe, NgFor, CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  usuarios$: Observable<any[]>;

  constructor(private clientesService: ClientesService) {
    this.usuarios$ = this.clientesService.getClientes();
  }
}
