import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { delay, Observable, of, throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class TaskService {

    private tasks:Task[]=[
    //     { id: 1, title: 'Setup project', description: 'setup the base project structure', status: 'todo' },
    // { id: 2, title: 'Login feature', description: 'complete the login feature', status: 'in-progress' },
    // { id: 3, title: 'Dashboard UI', description: 'complete the dashboard ui', status: 'done' }
    ];
    private idCounter=1;

    getTasks():Observable<Task[]> {
        return of(this.tasks).pipe(delay(1000));
    }
    createTask(task: Omit<Task, 'id'>): Observable<Task> {
        const newTask: Task = {
          id: this.idCounter++,
          title: task.title!,
          description: task.description || '',
          status: task.status || 'todo'
        };
    
        this.tasks.push(newTask);
    
        return of(newTask).pipe(delay(800)); // simulate API call
      }


      getTaskById(id:number):Observable<Task |undefined>{
        const task=this.tasks.find(t=>t.id===id);
        return of(task).pipe(delay(500));
      }

      updateTask(id:number,updated:Omit<Task,'id'>):Observable<void>{
        const index=this.tasks.findIndex(t=>t.id===id);
        if(index!==-1){
            this.tasks[index]={id,...updated};
        }
        return of(void 0).pipe(delay(500));
      }
    

      deleteTask(id:number):Observable<void>{
        const index=this.tasks.findIndex(task=>task.id===id);
        if(index===-1){
            return throwError(()=>new Error('Task not Found'));
        }

        this.tasks.splice(index,1);

        return of (void 0).pipe(delay(500));
      }
}