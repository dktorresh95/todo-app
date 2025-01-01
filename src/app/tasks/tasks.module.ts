import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TasksTableComponent,
    MainPageComponent,
    TaskCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
