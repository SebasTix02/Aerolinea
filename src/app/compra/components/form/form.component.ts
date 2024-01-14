import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompraService } from '../../services/compra.service';
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
    private compraService: CompraService
  ) {
    this.title = this.data ? 'EDITAR' : 'NUEVO';
    this.group = this.createForm();
    this.loadForm();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      idFlightPurchase: new FormControl('', Validators.required),
      idFlightP: new FormControl('', Validators.required),
      idUserP: new FormControl('', Validators.required),
      statusP: new FormControl('', Validators.required),
    });
  }

  private loadForm(): void {
    if (this.data) {
      this.group.patchValue({
        idFlightPurchase: this.data.idFlightPurchase,
        idFlightP: this.data.idFlightP,
        idUserP: this.data.idUserP,
        statusP: this.data.statusP,
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
      //const purchaseData = { id: this.data.idFlightPurchase, purchase: record };
      this.compraService.updatePurchase(record).pipe(
        catchError(error => {
          console.error(error);
          return of(null);
        })
      ).subscribe(result => {
        console.log(result)
        if (result !== null) {
          this.reference.close(result);
        }
      });
    } else {
      // Nuevo registro
      this.compraService.addPurchase(record).pipe(
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
