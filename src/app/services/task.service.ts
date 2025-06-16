import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/envs/environment';
import { Task } from '../models/task.model';
import { ApiResponse } from '../models/apiResponse.model';

@Injectable({
  providedIn: 'root',
})

export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // get all tasks
  getTasks(params: any): Observable<ApiResponse<Task>> {
    return this.http.get<any>(`${this.apiUrl}/tasks`, {params});
  }

  // create new task
  createTask(data: any): Observable<ApiResponse<Task>> {
    return this.http.post<any>(`${this.apiUrl}/tasks`, data);
  }

  getTaskById(id: number): Observable<ApiResponse<Task>> {
    return this.http.get<ApiResponse<Task>>(`${this.apiUrl}/tasks/${id}`);
  }

  // update a task
  updateTask(id: number, value: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${id}`, value);
  }

  // delete a task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }

  // complete task

  completeTask(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/tasks/${id}/complete`, null);
  }

}
