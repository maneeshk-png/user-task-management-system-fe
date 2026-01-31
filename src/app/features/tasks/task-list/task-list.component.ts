import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { Task } from "../../../core/models/task.model";
import { TaskService } from "../../../core/services/task.service";

import { ButtonComponent } from "../../../shared/components/button/buttton.component";
import { TableComponent, TableColumn } from "../../../shared/components/table/table.component";
import { FilterDropdownComponent } from "../../../shared/components/filter-dropdown/filter-dropdown.component";
import { STATUS_FILTER_OPTIONS } from "../../../configs/filter-options.config";
import { FormsModule } from "@angular/forms";
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,
     RouterLink,
     ButtonComponent,
     TableComponent,
     FilterDropdownComponent,
     FormsModule,
     SearchInputComponent,
     PaginationComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];//all task from API
  filteredTasks:Task[]=[];

  selectedStatus:string='all';
  
  statusOptions=STATUS_FILTER_OPTIONS;


  currentPage:number=1;
  pageSize:number=10;
  paginatedTasks:Task[]=[];



  //  Column config for reusable table
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
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      const statusFromUrl=params['status'] || 'all';

      this.selectedStatus=statusFromUrl;
      this.loadTasks(statusFromUrl);
    })
    //this.loadTasks(); //when reloads show all tasks

  }

  private loadTasks(statusFilter?:string): void {
    this.loading = true;
    this.error = false;

    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks=data;
        this.loading = false;

        if(statusFilter && statusFilter.toLowerCase()!=='all'){
          this.filteredTasks=this.tasks.filter(task=>task.status.toLowerCase()===statusFilter.toLowerCase())
        }else{
          this.filteredTasks=[...this.tasks];
        }
          this.currentPage=1;
          this.updatePagination();
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  // on search login

  onSearch(query:string){
    query=query.toLowerCase();

    this.filteredTasks=this.tasks.filter(task=>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
    this.currentPage=1;
    this.updatePagination();
  }


  onFilterChange(status:string){
    this.selectedStatus=status;
    if(status.toLowerCase()==='all' || !status){
      this.filteredTasks=[...this.tasks];
    }else{
      this.filteredTasks=this.tasks.filter(
        task=>task.status.toLowerCase()===this.selectedStatus.toLowerCase()
      )
    }
    this.currentPage=1;
    this.updatePagination();
  }
  
  //  Called from reusable table
  onEdit(task: Task): void {
    this.router.navigate(['/task/edit', task.id]);
  }

  //  Called from reusable table
  onDelete(task: Task): void {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);

        this.updatePagination();

        this.successMessage = "Task deleted successfully";
        setTimeout(() => this.successMessage = '', 1500);
      },
      error: () => this.error = true
    });
  }

//pagination
  updatePagination(){
    const start=(this.currentPage-1)*this.pageSize;
    const end=start + this.pageSize;
    this.paginatedTasks=this.filteredTasks.slice(start,end);
  }

  onPageChange(page:number){
    this.currentPage=page;
    this.updatePagination();
  }
}
