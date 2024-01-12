import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VuelosRoutingModule } from './vuelos-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { ShareModule } from '../share/share.module';
import { FormComponent } from './components/form/form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ReportesComponent } from './components/reportes/reportes.component';

@NgModule({
  declarations: [
    PageListComponent,
    FormComponent,
    ConfirmDialogComponent,
    ReportesComponent
  ],
  imports: [
    CommonModule,
    VuelosRoutingModule,
    ShareModule
  ]
})
export class VuelosModule { }
