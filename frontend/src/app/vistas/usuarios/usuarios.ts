import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AsyncPipe, NgFor, CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [AsyncPipe, NgFor, CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  usuarios$: Observable<any[]> = of([]);
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    // El fetch se hace solo en el navegador (evita problemas en prerender/SSR)
    if (this.platformId === 'browser') {
      this.usuarios$ = this.clientesService.getClientes();
    } else {
      this.usuarios$ = of([]);
    }
  }
}
