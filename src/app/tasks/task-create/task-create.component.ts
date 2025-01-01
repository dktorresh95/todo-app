import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  taskForm: FormGroup = new FormGroup ({});
  constructor(private formBuilder: FormBuilder,
    private router: Router
) { }
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required, Validators.minLength(5), Validators.maxLength(30)],
      description: ['', Validators.required, Validators.minLength(5), Validators.maxLength(50)]
    })
  }
}
