import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../model/vuelos.model';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private apiUrl = 'http://localhost/proyecto/ServiceFlight.svc/';

  constructor(private http: HttpClient) { }

  loadFlights(): Observable<Flight[]> {
    let uri = this.apiUrl + "FindAllFlights"
    return this.http.get<Flight[]>(uri);
  }

  loadFlight(idFlight: number): Observable<Flight> {
    const url = `${this.apiUrl}/${idFlight}`;
    return this.http.get<Flight>(url);
  }

  addFlight(flight: Flight): Observable<any> {
    let uri = this.apiUrl + "AddFlight"
    return this.http.post(uri, flight);
  }

  updateFlight(flight: Flight): Observable<any> {
    let uri = this.apiUrl + "EditFlight"
    return this.http.put(uri, flight);
  }

  async deleteFlight(idFlight: number): Promise<void> {
    try {
      let uri = this.apiUrl + "DeleteFlight/"+idFlight
      await this.http.delete(uri).toPromise();
    } catch (error) {
      throw error;
    }
  }

}
