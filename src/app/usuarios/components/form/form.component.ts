import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'gad-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  title = '';
  group: FormGroup;

  constructor(
    private reference: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuariosService
  ) {
    this.title = this.data ? 'EDITAR' : 'NUEVO';
    this.group = this.createForm();
    this.loadForm();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      dni: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthdayDate: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      civilStatus: new FormControl('', Validators.required),
      disability: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  private loadForm(): void {
    if (this.data) {
      this.group.patchValue({
        dni: this.data.dni,
        name: this.data.name,
        lastName: this.data.lastName,
        birthdayDate: this.data.birthdayDate,
        gender: this.data.gender,
        civilStatus: this.data.civilStatus,
        disability: this.data.disability,
        userName: this.data.userName,
        email: this.data.email,
        password: this.data.password,
      });
    }
  }

  save(): void {
    if (!this.group.valid) {
      console.error('Forma inválida');
      return;
    }

    const record = this.group.value;

    if (this.data) {
      const UsersData = { dni: this.data.dni, usuario: record };
      this.usuarioService.updateUsuario(UsersData).pipe(
        catchError(error => {
          console.error(error);
          return of(null);
        })
      ).subscribe(result => {
        if (result !== null) {
          this.reference.close(result);
        }
      });
    } else {
      // Nuevo registro
      this.usuarioService.addUsuario(record).pipe(
        catchError(error => {
          console.error(error);
          return of(null); // Devuelve un observable para que la cadena continúe
        })
      ).subscribe(result => {
        if (result !== null) {
          this.reference.close(result);
        }
      });
    }
  }
}
