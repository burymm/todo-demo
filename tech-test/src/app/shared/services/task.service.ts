import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TaskModel } from '../models';
import { CategoryEnum } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getList(): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(`${environment.apiUrl}/tasks`);
  }

  getTask(id: string): Observable<TaskModel> {
    return this.httpClient.get<TaskModel>(`${environment.apiUrl}/tasks/${id}`);
  }

  createTask(task: {label: string, description: string, category: CategoryEnum}): Observable<TaskModel> {
    const { label, description, category } = task;
    return this.httpClient.post<TaskModel>(
      `${environment.apiUrl}/tasks`,
      {
        label,
        description,
        category,
        done: false,
      },
      );
  }

  updateTask(task: TaskModel): Observable<TaskModel> {
    return this.httpClient.patch<TaskModel>(
      `${environment.apiUrl}/tasks/${task.id}`,
      {
        id: task.id,
        label: task.label,
        description: task.description,
        category: task.category,
        done: task.done,
      },
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/tasks/${id}`);
  }
}
