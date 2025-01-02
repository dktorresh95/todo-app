import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const mockTask: Task = { id: '1', title: 'Task', description: 'Description', completed: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of tasks', () => {
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBeGreaterThan(0);
    });
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(req.request.method).toBe('GET');
    req.flush([mockTask]);
  });

  it('should get task by Id', () => {
    const taskId = '1';
    service.getTaskById(taskId).subscribe((task) => {
      expect(task.id).toBe(taskId);
    });
    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTask);
  });

  it('should delete task by Id', () => {
    const taskId = '1';
    service.deleteTask(taskId).subscribe((resp) => {
      expect(resp).toBeTruthy();
    });
    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should create task', () => {
    const taskObject: Task = { 
      title: 'Task', description: 'Description', completed: false 
    };
    service.addTasks(taskObject).subscribe((resp) => {
      expect(resp).toBeTruthy();
    });
    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/todos`);
    expect(req.request.method).toBe('POST');
    req.flush(taskObject);
  });

  it('should update task', () => {
    const taskObject: Task = { 
      id:'1', title: 'Task', description: 'Description', completed: false 
    };
    service.updateTasks(taskObject, taskObject.id || '').subscribe((resp) => {
      expect(resp).toBeTruthy();
    });
    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/todos/${taskObject.id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(taskObject);
  });
});
