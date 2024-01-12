import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = false;

  constructor(private httpClient: HttpClient) {}

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  login(user: string, password: string): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/api/auth/login', { user, password });
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
