import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../core/services/task.service";
import { AuthService } from "../auth/auth.service";
import { Task } from "../../core/models/task.model";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { SummaryCardComponent } from "../../shared/components/summary-card/summary-card.component";

@Component({
    selector: 'app-dashboard',
    standalone:true,
    imports:[CommonModule,RouterLink,ButtonComponent,SummaryCardComponent],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
// Dashboard component showing task summaries
export class DashboardComponent implements OnInit { // Implements OnInit for initialization
    username=''; // Logged in user's name
    loading=true;  // Loading state
    error=false;// Error state

// Task summary counts
    total=0;
    todo=0;
    inProgress=0;
    done=0;

    // Dependency injection of TaskService, AuthService, and Router
    constructor(private taskService:TaskService, private authservice:AuthService,private router:Router){}

// On component initialization
    ngOnInit():void { // OnInit lifecycle hook
        const user=this.authservice.getUser(); // Get logged in user
        this.username=user?.username || '';  // Set username

        this.loadTasks(); // Load task summaries
    }

    // Summary cards data

    get summaryCards() { // Getter for summary card data
      return [ // Array of summary card configurations
        { title: 'Total Tasks', value: this.total, description: 'Count of all tasks' },
        { title: 'Todo', value: this.todo, description: 'Tasks with status todo',status:'todo' },
        { title: 'In Progress', value: this.inProgress, description: 'Tasks with',status:'in-progress' },
        { title: 'Done', value: this.done, description: 'Tasks with status done', status:'done' }
      ];
    }
// Navigate to task list with status filter
    goToTasks(status:string){      
      this.router.navigate(['/task'],{queryParams:{status:status}});
    }
  
  // Load tasks and compute summaries
    loadTasks() { 
        this.loading=true;
        this.error=false;

        this.taskService.getTasks().subscribe({
            next: (tasks: Task[]) => {
              this.total = tasks.length;
              this.todo = tasks.filter(t => t.status === 'todo').length;
              this.inProgress = tasks.filter(t => t.status === 'in-progress').length;
              this.done = tasks.filter(t => t.status === 'done').length;
              this.loading = false;
            },
            error: () => {
              this.error = true;
              this.loading = false;
            }
          });
    }
}