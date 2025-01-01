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
    return this.httpClient.get(this.urlApi);
  }

  addTasks(body: Task) {
    return this.httpClient.post(this.urlApi, body);
  }
}
