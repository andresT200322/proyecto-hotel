import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AsyncPipe, NgFor, CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { TablaService, TablaItem } from '../../services/tabla.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [AsyncPipe, NgFor, CommonModule],
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent {
  data$: Observable<TablaItem[]> = of([]);
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private tablaService: TablaService) {}

  ngOnInit(): void {
    // El fetch se hace solo en el navegador (evita problemas en prerender/SSR)
    if (this.platformId === 'browser') {
      this.data$ = this.tablaService.obtenerTabla();
    } else {
      this.data$ = of([]);
    }
  }

  fotoUrl(foto: string): string {
    return `/fotos/${encodeURIComponent(foto)}`;
  }
}