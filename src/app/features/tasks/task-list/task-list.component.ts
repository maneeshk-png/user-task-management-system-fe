import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { TaskService } from "../../../core/services/task.service";

import { ButtonComponent } from "../../../shared/components/button/button.component";
import { TableComponent, TableColumn } from "../../../shared/components/table/table.component";
import { FilterDropdownComponent } from "../../../shared/components/filter-dropdown/filter-dropdown.component";
import { STATUS_FILTER_OPTIONS } from "../../../configs/filter-options.config";
import { FormsModule } from "@angular/forms";
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { Task } from "../../../core/models/task.model";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonComponent,
    TableComponent,
    FilterDropdownComponent,
    FormsModule,
    SearchInputComponent,
    PaginationComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  // ===== DATA LAYERS =====
  tasks: Task[] = [];          // all tasks from API
  filteredTasks: Task[] = []; // after status filter
  //pageTasks: Task[] = [];     // current page only
  displayTasks: Task[] = [];  // table display (search result)

  // ===== UI STATE =====
  selectedStatus: string = 'all';
  statusOptions = STATUS_FILTER_OPTIONS;

  currentPage: number = 1;
  pageSize: number = 10;

  loading = true;
  error = false;
  successMessage = '';
  searchQuery = ''; // search query for task list

  // ===== TABLE CONFIG =====
  columns: TableColumn<Task>[] = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status' }
  ];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ===== INIT =====
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const statusFromUrl = params['status'] || 'all';
      this.selectedStatus = statusFromUrl;
      this.loadTasks(statusFromUrl);
    });
  }

  // ===== LOAD TASKS =====
  private loadTasks(statusFilter?: string): void {
    this.loading = true;
    this.error = false;

    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;

        // apply status filter
        if (statusFilter && statusFilter !== 'all') {
          this.filteredTasks = this.tasks.filter(
            task => task.status.toLowerCase() === statusFilter.toLowerCase()
          );
        } else {
          this.filteredTasks = [...this.tasks];
        }

        this.currentPage = 1;
        this.updatePagination();
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  // ===== PAGINATION =====
  private updatePagination(): void {
    let source = this.filteredTasks;
  
    // Apply search first
    if (this.searchQuery) {
      source = source.filter(task =>
        task.title.toLowerCase().includes(this.searchQuery) ||
        task.description.toLowerCase().includes(this.searchQuery)
      );
    }
  
    // Adjust current page if needed
    const totalPages = Math.ceil(source.length / this.pageSize);
    if (this.currentPage > totalPages && totalPages > 0) {
      this.currentPage = totalPages;
    }
  
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
  
    this.displayTasks = source.slice(start, end);
  }
  
  

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  // ===== PAGE-ONLY SEARCH =====
  onSearch(query: string): void {
    this.searchQuery = query.toLowerCase().trim();
    this.currentPage = 1;
   this.updatePagination();
  }


  // ===== STATUS FILTER =====
  onFilterChange(status: string): void {
    this.selectedStatus = status;
    this.currentPage = 1;

    if (status === 'all') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(
        task => task.status.toLowerCase() === status.toLowerCase()
      );
    }

    this.updatePagination();
  }

  // ===== TABLE ACTIONS =====
  onEdit(task: Task): void {
    this.router.navigate(['/task/edit', task.id]);
  }

  onDelete(task: Task): void {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.filteredTasks = this.filteredTasks.filter(t => t.id !== task.id);

        this.updatePagination();

        this.successMessage = "Task deleted successfully";
        setTimeout(() => this.successMessage = '', 1500);
      },
      error: () => this.error = true
    });
  }
  // inside TaskListComponent class
get totalItems(): number {
  let source = this.filteredTasks;

  // Apply search filter if active
  if (this.searchQuery) {
    source = source.filter(task =>
      task.title.toLowerCase().includes(this.searchQuery) ||
      task.description.toLowerCase().includes(this.searchQuery)
    );
  }

  return source.length;
}

}

