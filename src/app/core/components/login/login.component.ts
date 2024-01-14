import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'gad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  togglePassword = true;
  group: FormGroup;
  hide = true;
  urlFlights = '/ServiceUser.svc/Login'
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.group = new FormGroup({
      user: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    const user = this.group.get('user')?.value;
    const password = this.group.get('password')?.value;
    console.log({"password":password,"userName":user})
    this.httpClient.post<any>('http://localhost/proyecto/ServiceUser.svc/Login', {"password":password,"userName":user}).subscribe(
      (response) => {
        console.log(response  == true)
        if (response == true) {
          console.log('Inicio de sesión exitoso');
          this.authService.isLoggedIn = true; 
          this.router.navigate(['vuelos']);
        } else {
          console.error('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en la solicitud al backend:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
