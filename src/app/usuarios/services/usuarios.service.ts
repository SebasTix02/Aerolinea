import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  loadUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  loadUsuario(dni: string): Observable<any> {
    const url = `${this.apiUrl}/${encodeURIComponent(dni)}`;
    return this.http.get(url);
  }

  addUsuario(usuario: User): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  updateUsuario(usuarioData: { dni: string, usuario: User }): Observable<any> {
    const usuarioUrl = `${this.apiUrl}/${usuarioData.dni}`;
    return this.http.put(usuarioUrl, usuarioData.usuario);
  }

  async deleteUsuario(dni: string): Promise<void> {
    try {
      // Verificar si hay registros relacionados antes de eliminar
      const hasRelatedRecords = await this.checkForRelatedRecords(dni);

      // Si hay registros relacionados, lanzar un error
      if (hasRelatedRecords) {
        throw new Error('No se puede eliminar porque tiene registros enlazados.');
      }
      
      const usuarioUrl = `${this.apiUrl}/${dni}`;
      await this.http.delete(usuarioUrl).toPromise();
    } catch (error) {
      throw error;
    }
  }

  private async checkForRelatedRecords(dni: string): Promise<boolean> {
    try {
      const response = await this.http.get<boolean>(`${this.apiUrl}/hasRelatedRecords/${dni}`).toPromise();
      return response || false;  // Si response es undefined, asigna false
    } catch (error) {
      throw error;
    }
  }
}
