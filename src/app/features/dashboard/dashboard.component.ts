import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../core/services/task.service";
import { AuthService } from "../../core/services/auth.service";
import { Task } from "../../core/models/task.model";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { ButtonComponent } from "../../shared/components/button/buttton.component";
import { SummaryCardComponent } from "../../shared/components/summary-card/summary-card.component";

@Component({
    selector: 'app-dashboard',
    standalone:true,
    imports:[CommonModule,RouterLink,ButtonComponent,SummaryCardComponent],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    username='';
    loading=true;
    error=false;


    total=0;
    todo=0;
    inProgress=0;
    done=0;

    constructor(private taskService:TaskService, private authservice:AuthService,private router:Router){}


    ngOnInit():void {
        const user=this.authservice.getUser();
        this.username=user?.username || '';

        this.loadTasks();
        if(this.authservice.isLoggedIn()){
          this.router.navigate(['/dashboard']);
        }


    }

    get summaryCards() {
      return [
        { title: 'Total Tasks', value: this.total, description: 'Count of all tasks' },
        { title: 'Todo', value: this.todo, description: 'Tasks with status todo' },
        { title: 'In Progress', value: this.inProgress, description: 'Tasks with status in-progress' },
        { title: 'Done', value: this.done, description: 'Tasks with status done' }
      ];
    }

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