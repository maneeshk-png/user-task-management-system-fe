import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../core/services/task.service";
import { AuthService } from "../../core/services/auth.service";
import { Task } from "../../core/models/task.model";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-dashboard',
    standalone:true,
    imports:[CommonModule],
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

    constructor(private taskService:TaskService, private authservice:AuthService){}


    ngOnInit():void {
        const user=this.authservice.getUser();
        this.username=user?.username || '';

        this.loadTasks();
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