import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost/proyecto/ServiceUser.svc/';

  constructor(private http: HttpClient) { }

  loadUsuarios(): Observable<any> {
    let uri = this.apiUrl + "FindAllUsers"
    return this.http.get(uri);
  }

  loadUsuario(dni: string): Observable<any> {
    const url = `${this.apiUrl}/${encodeURIComponent(dni)}`;
    return this.http.get(url);
  }

  addUsuario(usuario: User): Observable<any> {
    let uri = this.apiUrl + "AddUser"
    return this.http.post(uri, usuario);
  }

  updateUsuario(usuario: User): Observable<any> {
    let uri = this.apiUrl + "Edit"
    return this.http.put(uri, usuario);
  }

  async deleteUsuario(dni: string): Promise<void> {
    try {
      let uri = this.apiUrl + "DeleteUser/"+dni
      await this.http.delete(uri).toPromise();
    } catch (error) {
      throw error;
    }
  }

}
