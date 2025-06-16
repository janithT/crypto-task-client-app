import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root', // makes it globally available
})
export class NotificationService {
  constructor(private snackbar: MatSnackBar) {}

  show(message: string, type: 'success' | 'error' = 'success'): void {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`${type}-snackbar`],
    });
  }
}
