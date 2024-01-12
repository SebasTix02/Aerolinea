import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../services/report.service';

@Component({
  selector: 'gad-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  datos: any[] = [];

  constructor(private reportesService: ReportesService) {}

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.reportesService.obtenerDatos().subscribe(
      (data) => {
        this.datos = data;
      },
      (error) => {
        console.error('Error al obtener datos: ', error);
      }
    );
  }
}
