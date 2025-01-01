import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { TaskCreateComponent } from './task-create/task-create.component';

const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'create', component: TaskCreateComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
