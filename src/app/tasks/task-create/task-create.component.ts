import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  taskForm: FormGroup = new FormGroup ({});
  task: Task = {};
  isEdit: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.isEdit = params.get('id') ? true: false;
      if (this.isEdit) {
        this.getTaskById(params?.get('id')?.toString() || '')
      }
    });
    this.buildForm()
  }

  createTask() {
    if (this.taskForm.valid) {
      this.taskService.addTasks(this.taskForm.value).subscribe( {
        next: (res: Task) => {
          this.showModalInfo(res, 'Información', 'creó')
        },
        error: err => {
          
        }
      })
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
  editTask() {
    if (this.taskForm.valid) {
      this.taskService.updateTasks(this.taskForm.value, this.taskForm.get('id')?.value || '').subscribe( {
        next: (res: Task) => {
          this.showModalInfo(res, 'Información', 'editó')
        },
        error: err => {
          
        }
      })
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
  showModalInfo(text: Task, title: string, action: string) {
    Swal.fire({
      title,
      text: `Se ${action} el registro con id ` + text.id,
      icon: "success"
    }).then( (res) => {
      if (res.isConfirmed) {
        this.return();
      }
    })
  }

  getTaskById(id: string) {
    this.taskService.getTaskById(id).subscribe( {
      next: (res: Task) => {
        this.buildForm(res);
      },
      error: err => {
        
      }
    })  
  }
  buildForm (response?: Task) {
    this.taskForm = this.formBuilder.group({
      id: this.isEdit ? response?.id : '',
      completed: this.isEdit ? response?.completed : false,
      title: [this.isEdit ? response?.title : '', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      description: [this.isEdit ? response?.title :  '', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
    this.taskForm.get('id')?.disable();
  }
  return() {
    this.router.navigate(['']);
  }
}
