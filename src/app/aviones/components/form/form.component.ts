import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AvionesService } from '../../services/aviones.service';
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
    private avionesService: AvionesService
  ) {
    this.title = this.data ? 'EDITAR' : 'NUEVO';
    this.group = this.createForm();
    this.loadForm();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      idPlane: new FormControl('', Validators.required),
      airlineName: new FormControl('', Validators.required),
      capacity: new FormControl('', Validators.required),
      availableSeats: new FormControl('', Validators.required),
    });
  }

  private loadForm(): void {
    if (this.data) {
      this.group.patchValue({
        idPlane: this.data.idPlane,
        airlineName: this.data.airlineName,
        capacity: this.data.capacity,
        availableSeats: this.data.availableSeats,
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
      const planeData = { id: this.data.idPlane, plane: record };
      this.avionesService.updatePlane(planeData).pipe(
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
      this.avionesService.addPlane(record).pipe(
        catchError(error => {
          console.error(error);
          return of(null);
        })
      ).subscribe(result => {
        if (result !== null) {
          this.reference.close(result);
        }
      });
    }
  }
}
