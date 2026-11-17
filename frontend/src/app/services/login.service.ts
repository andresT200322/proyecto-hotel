import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly url = '/api/v1/clientes';

  constructor(private http: HttpClient) {}

  login(credenciales: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, credenciales);
  }
}