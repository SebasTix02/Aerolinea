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
import { AvionesService } from '../../services/aviones.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'gad-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  records: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: "idPlane", title: "CÓDIGO" },
    { field: "airlineName", title: "NOMBRE DE LA AEROLINEA" },
    { field: "capacity", title: "CAPACIDAD" },
    { field: "availableSeats", title: "ASIENTOS DISPONIBLES" },
  ];
  data: any[] = [];
  totalRecords = this.records.length;

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  constructor(
    private bottomSheet: MatBottomSheet,
    private planeService: AvionesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadPlanes();
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.records.slice(skip, skip + pageSize);
  }

  loadPlanes() {
    this.planeService.loadPlanes().subscribe(
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
        this.loadPlanes();
        this.showMessage('Avion guardado exitosamente');
      }
    });
  }

  delete(idFlight: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: '¿Estás seguro de que deseas eliminar este avion?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.planeService.deletePlane(idFlight).then(() => {
          this.loadPlanes();
          this.showMessage('Centro eliminado exitosamente');
        }).catch((error) => {
          this.showMessage('No se puede eliminar el avion. Tiene registros enlazados.');
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
    const informeFormateado = this.formatoInforme(this.records, 'Informe de Aviones');

    const blob = new Blob([informeFormateado], { type: 'text/plain;charset=utf-8' });

    saveAs(blob, 'informeAviones.txt');
  }

  formatoInforme(datos: any[], titulo: string): string {

    const titulos = [' CÓDIGO ', ' NOMBRE DE LA AEROLINEA ',' CAPACIDAD ',' ASIENTOS DISPONIBLES '];

    const filas = [titulos, ...datos.map(row => [row.idPlane, row.airlineName, row.capacity, row.availableSeats])];

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
