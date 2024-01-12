import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { ContainerComponent } from './components/container/container.component';
import { TableComponent } from './components/table/table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PaginatorComponent } from './components/paginator/paginator.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DownloadComponent } from './components/download/download.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { KeypadButtonComponent } from './components/keypad-button/keypad-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    TitleComponent,
    ContainerComponent,
    TableComponent,
    PaginatorComponent,
    DownloadComponent,
    KeypadButtonComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    TitleComponent,
    ContainerComponent,
    TableComponent,
    KeypadButtonComponent,
    NgScrollbarModule,
    PaginatorComponent,
    MatIconModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    DownloadComponent,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule
  ]
})
export class ShareModule { }
