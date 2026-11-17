import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TablaItem {
  id?: number;
  foto: string;
  nombre: string;
  descripcion: string;
  precio: number;
}

@Injectable({
  providedIn: 'root',
})
export class TablaService {
  private readonly apiUrl = 'http://localhost:3001/api/v1/tabla';

  constructor(private http: HttpClient) {}

  obtenerTabla(): Observable<TablaItem[]> {
    return this.http.get<TablaItem[]>(this.apiUrl);
  }
}