import { Component, ViewChild } from '@angular/core';

import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { ConfirmCompleteDialogComponent } from 'src/app/shared/confirm-complete-dialog/confirm-complete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  pageIndex: number = 0;
  pageSize: number = 5;
  totalItems: number = 0;
  selectedStatus: string = 'all';
  loading: boolean = false;

  displayedColumns: string[] = [
    'id',
    'title',
    'status',
    'formatted_created_at',
    'actions',
  ];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // pagination change
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }

  // filter by status
  onStatusChanged(status: string): void {
    this.selectedStatus = status;
    this.pageIndex = 0;
    this.loadTasks();
  }

  // load tasks
  loadTasks(): void {
    this.loading = true;

    const params: any = {
      page: this.pageIndex + 1,
      perPage: this.pageSize,
    };

    // status filter
    if (this.selectedStatus && this.selectedStatus !== 'all') {
      params.status = this.selectedStatus;
    }

    this.taskService.getTasks(params).subscribe({
      next: (response: any) => {
        if (
          response.status === 'success' &&
          Array.isArray(response.data.data)
        ) {
          this.dataSource = new MatTableDataSource<Task>(response.data.data);
          this.totalItems = response.data.total;
          this.pageSize = response.data.per_page;
          this.pageIndex = response.data.current_page - 1;
          this.loading = false;
        }
      },
      error: (err) => {
        console.error(
          err?.error?.message || 'Something went wrong. Please try again.',
          err
        );
        this.loading = false;
        this.notificationService.show(
          err?.error?.message || 'Something went wrong. Please try again.',
          'error'
        );
      },
    });
  }

  // Complete tasks modal
  openCompleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmCompleteDialogComponent, {
      width: '350px',
      data: { id: task.id, status: task.status, title: task.title },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (typeof task.id === 'number') {
          this.taskService.completeTask(task.id).subscribe({
            next: (response) => {
              if (response.status === 'success') {
                this.loadTasks();
                this.notificationService.show(
                  response?.message || 'Task completed',
                  'success'
                );
              }
            },
            error: (err) => {
              // console.error('Failed to complete task:', err)
              this.notificationService.show(
                err?.error?.message ||
                  'Task id is undefined, cannot complete task',
                'error'
              );
            },
          });
        } else {
          // console.error('Task id is undefined, cannot complete task.');
          this.notificationService.show(
            'Task id is undefined, cannot complete task',
            'error'
          );
        }
      }
    });
  }

  // delete task modal
  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { id: task.id, title: task.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (typeof task.id === 'number') {
          this.taskService.deleteTask(task.id).subscribe({
            next: (response) => {
              if (response.status === 'success') {
                this.loadTasks();
                this.notificationService.show(
                  response?.message || 'Deleted successfully',
                  'success'
                );
              }
            },
            error: (err) => {
              this.notificationService.show(
                err?.error?.message || 'Cannot delete task',
                'error'
              );
            },
          });
        } else {
          // console.error('Task id is undefined, cannot delete task.');
          this.snackbar.open(
            'Task id is undefined, cannot delete task.',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            }
          );
        }
      }
    });
  }
}
