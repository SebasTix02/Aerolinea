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
import { UsuariosService } from '../../services/usuarios.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'gad-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  records: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: "dni", title: "CÉDULA" },
    { field: "name", title: "NOMBRE" },
    { field: "lastName", title: "APELLIDO" },
    { field: "birthdayDate", title: "FECHA NACIMIENTO" },
    { field: "gender", title: "GENERO" },
    { field: "civilStatus", title: "ESTADO CIVIL" },
    { field: "disability", title: "DISCAPACIDAD" },
    { field: "userName", title: "USUARIO" },
    { field: "email", title: "EMAIL" },
    { field: "password", title: "CONTRASEÑA" }
  ];
  data: any[] = [];
  totalRecords = this.records.length;

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  constructor(
    private bottomSheet: MatBottomSheet,
    private usuarioService: UsuariosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadUsers();
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.data = this.records.slice(skip, skip + pageSize);
  }

  loadUsers() {
    this.usuarioService.loadUsuarios().subscribe(
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
        this.loadUsers();
        this.showMessage('Avion guardado exitosamente');
      }
    });
  }

  delete(dni: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: '¿Estás seguro de que deseas eliminar este avion?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.deleteUsuario(dni).then(() => {
          this.loadUsers();
          this.showMessage('Centro eliminado exitosamente');
        }).catch((error) => {
          this.showMessage('No se puede eliminar el centro. Tiene registros enlazados.');
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
