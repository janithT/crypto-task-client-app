import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// import { ButtonComponent } from './components/button/button.component';
// import { FormInputFieldComponent } from './components/form-input-field/form-input-field.component';

//Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputFieldComponent } from './components/mat-input-field/mat-input-field.component';
import { MatButtonComponent } from './components/mat-button/mat-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StatusFilterComponent } from './components/status-filter/status-filter.component';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmCompleteDialogComponent } from './confirm-complete-dialog/confirm-complete-dialog.component';


@NgModule({
  declarations: [
    // ButtonComponent,
    // FormInputFieldComponent,
    MatInputFieldComponent,
    MatButtonComponent,
    StatusFilterComponent,
    ConfirmDeleteDialogComponent,
    ConfirmCompleteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  exports: [
    // ButtonComponent,
    // FormInputFieldComponent,
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    //Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatInputFieldComponent,
    MatButtonComponent,
    MatSelectModule,
    StatusFilterComponent,
    MatProgressSpinnerModule,
    ConfirmDeleteDialogComponent,
    MatDialogModule
  ]
})
export class SharedModule { }
