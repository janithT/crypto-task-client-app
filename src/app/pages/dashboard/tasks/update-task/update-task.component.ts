import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  taskForm!: FormGroup;
  taskId!: number;
  updating: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private notificationService: NotificationService
  ) {
      this.taskId = +this.route.snapshot.paramMap.get('id')!;
      this.taskForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)] ],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      });
    }

  // oninit
  ngOnInit(): void {
    this.getTask();
  }

  // get controlls
  getControl(controlName: string): FormControl {
    return this.taskForm.get(controlName) as FormControl; 
  }

  // get task for edit
  getTask (): void{
    this.loading = true;
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (response : any) => {
        const task: Task = response.data
        this.taskForm.patchValue({
          title: task.title,
          description: task.description
        });
        this.loading = false;
        
      },
      error: (err) => {
        console.error('Failed to load task:', err);
        this.loading = false;
        this.notificationService.show(err?.errors?.message || 'Failed to load task' , 'error');
        this.router.navigate(['/dashboard/tasks'])
      }
    });
  }

  updateForm(): void {
    this.loading = true;
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe({
        next: (response : any) => {
          if (response.status == "success") {
            this.notificationService.show(response?.message || 'task updated successfuly' , 'success');
            this.router.navigate(['/dashboard/tasks'])
          } else {
            this.notificationService.show('Task updated failed.', 'error');
          }
          
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to update task:', err);
          this.loading = false;
          this.notificationService.show(err?.error?.message || 'Task updated failed' , 'success');
          this.router.navigate(['/dashboard/tasks'])
        }
      });
    }
  }

}
