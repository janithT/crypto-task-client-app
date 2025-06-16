import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/apiResponse.model';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.getTask();
    
  }

  getControl(controlName: string): FormControl {
    return this.taskForm.get(controlName) as FormControl; 
  }

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
      }
    });
  }

  updateForm(): void {
    this.loading = true;
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe({
        next: (response : any) => {
          const task: Task = response.data
          this.taskForm.patchValue({
            title: task.title,
            description: task.description
          });
          this.loading = false;
          this.router.navigate(['/dashboard/tasks'])
          
        },
        error: (err) => {
          console.error('Failed to update task:', err);
          this.loading = false;
        }
      });
    }
  }

}
