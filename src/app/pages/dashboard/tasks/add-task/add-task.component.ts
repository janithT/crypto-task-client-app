import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { TaskService } from 'src/app/services/task.service';

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

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService, 
    private router: Router, 
    private notificationService: NotificationService
  ) {
    this.taskForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
          description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]]
        });
  }

  // get controller names
    getControl(controlName: string): FormControl {
      return this.taskForm.get(controlName) as FormControl;
   
    }

  // create task 
  createTask(): void {
    this.loading = true;

    this.taskService.createTask(this.taskForm.value).subscribe({
      
      next: (response: any) => {
        console.log('create task successful:', response);
        this.taskForm.reset();
        this.loading = false;
        if (response.status == "success") {
          this.notificationService.show(response?.message, 'success');
          this.router.navigate(['/dashboard/tasks']);
        } else {
          this.notificationService.show('Task created failed.', 'error');
        }

      },
      error: (err) => {
        if (err?.error?.errors) {
          // Laravel validation errors
          this.handleValidationErrors(err?.error?.errors);
          this.loading = false;
          this.notificationService.show(err?.error?.errors || 'Create task failed.', 'success');
        } else {
          // Generic error
          this.errorMessage = err?.error?.message || 'Create task failed';
          this.loading = false;
          this.notificationService.show(err?.error?.message || 'Create task failed.', 'error');
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
