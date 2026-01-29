import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";

import { Task } from "../../../core/models/task.model";
import { TaskService } from "../../../core/services/task.service";

import { ButtonComponent } from "../../../shared/components/button/buttton.component";
import { TableComponent, TableColumn } from "../../../shared/components/table/table.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, TableComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  // 🔥 Column config for reusable table
  columns: TableColumn<Task>[] = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status' }
  ];

  loading = true;
  error = false;
  successMessage = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.loading = true;
    this.error = false;

    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  // 🟢 Called from reusable table
  onEdit(task: Task): void {
    this.router.navigate(['/task/edit', task.id]);
  }

  // 🔴 Called from reusable table
  onDelete(task: Task): void {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.successMessage = "Task deleted successfully";
        setTimeout(() => this.successMessage = '', 1500);
      },
      error: () => this.error = true
    });
  }
}
