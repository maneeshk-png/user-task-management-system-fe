import { Component, OnInit } from "@angular/core";
import { Task } from "../../../core/models/task.model";
import { TaskService } from "../../../core/services/task.service";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector:'app-task-list',
    standalone:true,
    imports:[CommonModule,RouterLink],
    templateUrl:'./task-list.component.html',
    styleUrls:['./task-list.component.css']
})

export class TaskListComponent implements OnInit{
    tasks:Task[]=[];
    loading=true;
    error=false;
    successMessage='';

    constructor(private taskService:TaskService , private router:Router){}

    ngOnInit():void {
        this.loadTasks();
    }



    loadTasks(){
        this.loading=true;
        this.error=false;
        this.successMessage='';

        this.taskService.getTasks().subscribe({
            next:(data)=>{
                this.tasks=data;
                this.loading=false;
            },
            error:()=>{
                this.error=true;
                this.loading=false;
            }
        })
    }

    editTask(id:number){
        this.router.navigate(['/task/edit',id]);
    }

    deleteTask(id:number){
        const confirmDelete=confirm("Are you Sure? ,Want to delete this Task?");

        if(!confirmDelete) return;
        
        this.taskService.deleteTask(id).subscribe({
            next:()=>{

                this.loading=false;
                this.tasks = this.tasks.filter(task => task.id !== id);
                this.successMessage='Task Deleted Sucessfully';
                    setTimeout(()=>{
                        this.successMessage='';
                        this.router.navigate(['/task']);
                    },1200);
            },

            error:()=>{
                this.error=true;
            }
        })
    }

}