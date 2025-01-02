import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCreateComponent } from './task-create.component';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Task } from 'src/app/models/task.model';

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;
  let taskService: TaskService;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  const mockTasks: Task =  { id: '2', title: 'Tarea 1', description: 'Descripción 1', completed: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [TaskCreateComponent],
      providers: [
        TaskService,
        FormBuilder,
        {
          provide: TaskService,
          useValue: {
            addTasks: jasmine.createSpy('addTasks').and.returnValue(of({})),
            updateTasks: jasmine.createSpy('updateTasks').and.returnValue(of({})),
            getTaskById: jasmine.createSpy('getTaskById').and.returnValue(of(mockTasks)),

          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => null })
          }
        }
      ],
    });
    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty form when creating a task', () => {
    component.ngOnInit();
    expect(component.isEdit).toBeFalse();
    expect(component.taskForm.get('title')?.value).toBe('');
    expect(component.taskForm.get('description')?.value).toBe('');
    expect(component.taskForm.get('id')?.value).toBe('');
  });

  it('should create task when form is valid', () => {
    component.taskForm.setValue({
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
      id: ''
    });
    component.createTask();
    expect(taskService.addTasks).toHaveBeenCalled();
  });

  it('should create task when form is invalid (length or required)', () => {
    component.taskForm.setValue({
      title: 'T',
      description: 'T',
      completed: false,
      id: ''
    });
    component.createTask();
    expect(component.taskForm.invalid).toBeTruthy();
  });

  it('should edit task when form is valid', () => {
    component.taskForm.setValue({
      title: 'TaskName',
      description: 'Description',
      completed: true,
      id: '2'
    });
    component.editTask();
    expect(taskService.updateTasks).toHaveBeenCalled();
  });

  it('should get task by Id', () => {
    component.getTaskById('2');
    expect(taskService.getTaskById).toHaveBeenCalled();
  });
});