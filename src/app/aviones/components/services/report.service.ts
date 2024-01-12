import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  private apiUrl = 'http://localhost:3000/api/aviones';

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/datos`);
  }
}