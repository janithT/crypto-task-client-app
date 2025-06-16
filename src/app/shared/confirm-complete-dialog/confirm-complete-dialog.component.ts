import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-complete-dialog',
  templateUrl: './confirm-complete-dialog.component.html',
  styleUrls: ['./confirm-complete-dialog.component.css'],
})
export class ConfirmCompleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; title: string }
  ) {}

  confirmStatus(): void {
    this.dialogRef.close(true); // return true to confirm
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
