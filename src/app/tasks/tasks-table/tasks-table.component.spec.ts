import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksTableComponent } from './tasks-table.component';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import Swal from 'sweetalert2';

describe('TasksTableComponent', () => {
  let component: TasksTableComponent;
  let fixture: ComponentFixture<TasksTableComponent>;
  let taskService: TaskService;
  let router: Router;

  const mockTasks: Task[] = [
    { id: '1', title: 'Tarea 1', description: 'Descripción 1', completed: false },
    { id: '2', title: 'Tarea 2', description: 'Descripción 2', completed: true },
  ];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TasksTableComponent],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: jasmine.createSpy('getTasks').and.returnValue(of(mockTasks)),
            deleteTask: jasmine.createSpy('deleteTask').and.returnValue(of({}))
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    });
    fixture = TestBed.createComponent(TasksTableComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get tasks OnInit', () => {
    spyOn(component, 'loadTasks').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.loadTasks).toHaveBeenCalled();
    expect(component.tasks.length).toBeGreaterThan(0);
  });

  it('should go to the edit page when edit is called', () => {
    component.edit('1');
    expect(router.navigate).toHaveBeenCalledWith(['tasks/edit', '1']);
  });

  it('should delete a task', () => {
    component.delete('3');
    expect(taskService.deleteTask).toHaveBeenCalled();
  });
});
