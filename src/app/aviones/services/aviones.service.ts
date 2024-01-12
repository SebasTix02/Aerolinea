import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plane } from '../model/avion.model';

@Injectable({
  providedIn: 'root'
})
export class AvionesService {

  private apiUrl = 'http://localhost:3000/api/aviones';

  constructor(private http: HttpClient) { }

  loadPlanes(): Observable<Plane[]> {
    return this.http.get<Plane[]>(this.apiUrl);
  }

  loadPlane(idPlane: string): Observable<Plane> {
    const url = `${this.apiUrl}/${encodeURIComponent(idPlane)}`;
    return this.http.get<Plane>(url);
  }

  addPlane(plane: Plane): Observable<any> {
    return this.http.post(this.apiUrl, plane);
  }

  updatePlane(planeData: { id: string, plane: Plane }): Observable<any> {
    const planeUrl = `${this.apiUrl}/${planeData.id}`;
    return this.http.put(planeUrl, planeData.plane);
  }

  async deletePlane(idPlane: string): Promise<void> {
    try {
      // Verificar si hay registros relacionados antes de eliminar
      const hasRelatedRecords = await this.checkForRelatedRecords(idPlane);

      // Si hay registros relacionados, lanzar un error
      if (hasRelatedRecords) {
        throw new Error('No se puede eliminar porque tiene registros enlazados.');
      }

      const planeUrl = `${this.apiUrl}/${idPlane}`;
      await this.http.delete(planeUrl).toPromise();
    } catch (error) {
      throw error;
    }
  }

  private async checkForRelatedRecords(idPlane: string): Promise<boolean> {
    try {
      const response = await this.http.get<boolean>(`${this.apiUrl}/hasRelatedRecords/${idPlane}`).toPromise();
      return response || false;  // Si response es undefined, asigna false
    } catch (error) {
      throw error;
    }
  }
}
