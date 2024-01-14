import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlightsService } from '../../services/vuelos.service';
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
    private flightsService: FlightsService
  ) {
    this.title = this.data ? 'EDITAR' : 'NUEVO';
    this.group = this.createForm();
    this.loadForm();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      idFlight: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      departureDate: new FormControl('', Validators.required),
      arrivalDate: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      flightClass: new FormControl('', Validators.required),
      idPlane: new FormControl('', Validators.required),
    });
  }

  private loadForm(): void {
    if (this.data) {
      this.group.patchValue({
        idFlight: this.data.idFlight,
        name: this.data.name,
        departureDate: this.data.departureDate,
        arrivalDate: this.data.arrivalDate,
        price: this.data.price,
        flightClass: this.data.flightClass,
        idPlane: this.data.idPlane,
      });
    }
  }

  save(): void {
    if (!this.group.valid) {
      console.error('Forma invalida');
      return;
    }

    const record = this.group.value;

    if (this.data) {
      this.flightsService.updateFlight(record).pipe(
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
      this.flightsService.addFlight(record).pipe(
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
