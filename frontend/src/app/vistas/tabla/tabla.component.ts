import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { TablaService, TablaItem } from '../../services/tabla.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent {
  readonly data$: Observable<TablaItem[]>;

  constructor(private tablaService: TablaService) {
    this.data$ = this.tablaService.obtenerTabla();
  }

  fotoUrl(foto: string): string {
    return `http://localhost:3001/fotos/${encodeURIComponent(foto)}`;
  }
}