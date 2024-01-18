import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'gad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  isLoginForm = true;
  group: FormGroup;
  groupRegister: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.group = new FormGroup({
      user: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null), // Agrega este control sin validador
    });
    this.groupRegister = new FormGroup({
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null), 
      name: new FormControl(null),
      dni: new FormControl(null),
      birthdayDate: new FormControl(null),
      gender: new FormControl(null),
      civilStatus: new FormControl(null),
      disability: new FormControl(null),
      userName: new FormControl(null),
      email: new FormControl(null),
      lastName: new FormControl(null)
    });

    // Establece el validador solo para el formulario de registro
    if (!this.isLoginForm) {
      this.groupRegister.get('confirmPassword')?.setValidators([Validators.required]);
    }
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

  toggleForms() {
    this.isLoginForm = !this.isLoginForm;

    // Restablece los validadores al cambiar el formulario
    if (this.isLoginForm) {
      this.group.get('confirmPassword')?.clearValidators();
    } else {
      this.groupRegister.get('confirmPassword')?.setValidators([Validators.required]);
    }

    this.group.get('confirmPassword')?.updateValueAndValidity();

    this.cdRef.detectChanges();
  }

  toggleHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  toggleHideConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  registro() {
    const password = this.groupRegister.get('password')?.value;
    const confirmPassword = this.groupRegister.get('confirmPassword')?.value;
    const dni = this.groupRegister.get('dni')?.value;
    const name = this.groupRegister.get('name')?.value;
    const lastName = this.groupRegister.get('lastName')?.value;
    const birthdayDate = this.groupRegister.get('birthdayDate')?.value;
    const gender = this.groupRegister.get('gender')?.value;
    const civilStatus = this.groupRegister.get('civilStatus')?.value;
    const disability = this.groupRegister.get('disability')?.value;
    const userName = this.groupRegister.get('userName')?.value;
    const email = this.groupRegister.get('email')?.value;

    if (this.isLoginForm) {
      // Aquí implementa la lógica de inicio de sesión
    } else {
      // Aquí implementa la lógica de registro
      // Verifica si las contraseñas coinciden
      if (password !== confirmPassword) {
        alert("Las contraseñas deben coincidir")
        return;
      }
      
      console.log('Registro de sesión', password, dni, birthdayDate, gender, civilStatus, disability, userName, email, name);
      this.httpClient.post<any>('http://localhost/proyecto/ServiceUser.svc/Register', {"birthdayDate":birthdayDate,
      "civilStatus":civilStatus,"disability":disability,"dni":dni,"gender":gender,"lastName":lastName,
      "name":name,"email":email,"password":password,"userName":userName}).subscribe(
      (response) => {
        console.log(response  == true)
        if (response == true) {
          console.log('Registro exitoso');
          this.authService.isLoggedIn = true; 
          this.router.navigate(['vuelos']);
        } else {
          console.error('Error');
        }
      },
      (error) => {
        console.error('Error en la solicitud al backend:', error);
      }
    );
    }
  }
}
