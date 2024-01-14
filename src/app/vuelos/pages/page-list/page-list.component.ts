import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment.development';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FormComponent } from '../../components/form/form.component';
import { DownloadComponent } from 'src/app/share/components/download/download.component';
import { MetaDataColumn } from 'src/app/share/interfaces/metacolumn.interface';
import { KeypadButton } from 'src/app/share/interfaces/keypadbutton.interface';
import { FlightsService } from '../../services/vuelos.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'gad-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  records: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: "IdFlight", title: "VUELO" },
    { field: "name", title: "NOMBRE" },
    { field: "departureDate", title: "FECHA DE SALIDA" },
    { field: "arrivalDate", title: "FECHA DE LLEGADA" },
    { field: "price", title: "PRECIO" },
    { field: "flightClass", title: "CLASE DE VUELO" },
    { field: "idPlane", title: "AVION" },

  ];
  data: any[] = [];
  
  totalRecords = this.records.length;

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  constructor(
    private bottomSheet: MatBottomSheet,
    private flightService: FlightsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadFlights();
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.records.slice(skip, skip + pageSize);
  }

  loadFlights() {
    this.flightService.loadFlights().subscribe(
      (data) => {
        this.records = data;
        this.totalRecords = this.records.length;
        this.changePage(0);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openForm(row: any = null) {
    const dialogRef = this.dialog.open(FormComponent, {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFlights();
        this.showMessage('Avion guardado exitosamente');
      }
    });
  }

  delete(idFlight: any) {
    console.log(idFlight)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: '¿Estás seguro de que deseas eliminar este vuelo?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.flightService.deleteFlight(idFlight).then(() => {
          this.loadFlights();
          this.showMessage('Centro eliminado exitosamente');
        }).catch((error) => {
          this.showMessage('No se puede eliminar el vuelo.');
        });
      }
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.descargarInforme();
        break;
      case 'NEW':
        this.openForm();
        break;
    }
  }

  descargarInforme() {
    const informeFormateado = this.formatoInforme(this.records, 'Informe de Usuarios');

    const blob = new Blob([informeFormateado], { type: 'text/plain;charset=utf-8' });

    saveAs(blob, 'informeUsuarios.txt');
  }

  formatoInforme(datos: any[], titulo: string): string {

    const titulos = [' CÉDULA ', ' NOMBRE ',' APELLIDO ',' FECHA NACIMIENTO ',' GENERO ', ' ESTADO CIVIL ', ' DISCAPACIDAD ', ' USUARIO ', ' EMAIL ', ' CONTRASEÑA '];

    const filas = [titulos, ...datos.map(row => [row.idCenter, row.centerName])];

    const contenido = [titulo, '', filas.map(row => row.join(', ')).join('\n')].join('\n');

    return contenido;
  }

  showBottomSheet(title: string, fileName: string, data: any) {
    this.bottomSheet.open(DownloadComponent);
  }

  showMessage(message: string, duration: number = 5000) {
    this.snackBar.open(message, '', { duration });
  }
}
