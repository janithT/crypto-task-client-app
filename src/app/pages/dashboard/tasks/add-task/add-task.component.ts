import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  taskForm: FormGroup;
  loading: boolean = false;
  creating = false;
  errorMessage = '';
  selectedStatus = 'all'

  constructor(private fb: FormBuilder,private taskService: TaskService, private router: Router, private snackbar: MatSnackBar) {
    this.taskForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
          description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
        });
  }

  // get controller names
    getControl(controlName: string): FormControl {
      return this.taskForm.get(controlName) as FormControl;
   
    }

  onStatusChanged(status: string): void {
    this.taskForm.get('status')?.setValue(status);
    this.taskForm.get('status')?.markAsTouched();
  }

  createTask(): void {
    this.loading = true;

    this.taskService.createTask(this.taskForm.value).subscribe({
      
      next: (response) => {
        console.log('create task successful:', response);
        this.taskForm.reset();
        this.loading = false;
        if (response.status == "success")

        this.snackbar.open(response?.message || 'create task successful.', 'Close', {
          duration: 3000, 
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'] 
        });

        this.router.navigate(['/dashboard/tasks']);
      },
      error: (err) => {
        if (err?.error?.errors) {
          // Laravel validation errors
          this.handleValidationErrors(err.error.errors);

          this.loading = false;
        } else {
          // Generic error
          this.errorMessage = err?.error?.message || 'Create task failed';
          this.loading = false;

          this.snackbar.open(err?.error?.message || 'Create task failed.', 'Close', {
            duration: 3000, 
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'] 
          });
        }
      },
    });
  }

  // Laravel validation errors
  handleValidationErrors(errors: { [key: string]: string[] }) {
    Object.keys(errors).forEach((field) => {
      const control = this.taskForm.get(field);
      if (control) {
        const errorMessages = errors[field];
        control.setErrors({
          server: errorMessages,
        });
      }
    });
  }

}
