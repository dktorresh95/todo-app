import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  urlApi = 'https://jsonplaceholder.typicode.com/todos'
  constructor(private httpClient: HttpClient) { }

  getTasks() {
    return this.httpClient.get<Task[]>(this.urlApi);
  }
  getTaskById(id: string) {
    return this.httpClient.get<Task>(this.urlApi + `/${id}`);
  }
  addTasks(body: Task) {
    return this.httpClient.post(this.urlApi, body);
  }
  deleteTask(id: string) {
    return this.httpClient.delete(this.urlApi+ `/${id}`);
  }
  updateTasks(body: Task, id: string) {
    return this.httpClient.patch(this.urlApi+ `/${id}`, body);
  }
}
