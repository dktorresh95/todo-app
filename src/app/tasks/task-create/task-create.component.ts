import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router
) { }
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    })
  }

  createTask() {
    if (this.taskForm.valid) {
      this.taskService.addTasks(this.taskForm.value).subscribe( {
        next: (res: Task) => {
          this.showModalInfo(res, 'Información')
        },
        error: err => {
          
        }
      })
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  showModalInfo(text: Task, title: string) {
    Swal.fire({
      title,
      text: 'Se creó el registro con id ' + text.id,
      icon: "success"
    });
  }
}
