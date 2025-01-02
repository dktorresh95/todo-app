import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.css']
})
export class TasksTableComponent implements OnInit {
  tasks: Task[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  paginatedTasks: Task[] = [];
  totalTasks: number = 0;
  totalPages: number = 0;
  pageRange: number[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((res: Task[]) => {
      this.tasks = res;
      this.totalTasks = res.length;
      this.getTotalPages();
      this.updatePaginatedTasks();
      this.updatePageRange();
    });
  }

  updatePaginatedTasks() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTasks = this.tasks.slice(startIndex, endIndex);
  }

  updatePageRange() {
    const rangeSize = 3;
    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.totalPages, startPage + rangeSize - 1);

    this.pageRange = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pageRange.push(i);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTasks();
      this.updatePageRange();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTasks();
      this.updatePageRange();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedTasks();
    this.updatePageRange();
  }

  getTotalPages() {
    this.totalPages = Math.ceil(this.totalTasks / this.pageSize);
  }
}