import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../model/vuelos.model';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private apiUrl = 'http://localhost:3000/api/vuelos';

  constructor(private http: HttpClient) { }

  loadFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  loadFlight(idFlight: number): Observable<Flight> {
    const url = `${this.apiUrl}/${idFlight}`;
    return this.http.get<Flight>(url);
  }

  addFlight(flight: Flight): Observable<any> {
    return this.http.post(this.apiUrl, flight);
  }

  updateFlight(flightData: { id: number, flight: Flight }): Observable<any> {
    const flightUrl = `${this.apiUrl}/${flightData.id}`;
    return this.http.put(flightUrl, flightData.flight);
  }

  async deleteFlight(idFlight: number): Promise<void> {
    try {
      // Verificar si hay registros relacionados antes de eliminar
      const hasRelatedRecords = await this.checkForRelatedRecords(idFlight);

      // Si hay registros relacionados, lanzar un error
      if (hasRelatedRecords) {
        throw new Error('No se puede eliminar porque tiene registros enlazados.');
      }

      const flightUrl = `${this.apiUrl}/${idFlight}`;
      await this.http.delete(flightUrl).toPromise();
    } catch (error) {
      throw error;
    }
  }

  private async checkForRelatedRecords(idFlight: number): Promise<boolean> {
    try {
      const response = await this.http.get<boolean>(`${this.apiUrl}/hasRelatedRecords/${idFlight}`).toPromise();
      return response || false;  // Si response es undefined, asigna false
    } catch (error) {
      throw error;
    }
  }
}
