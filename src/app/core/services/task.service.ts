import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { delay, Observable, of } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class TaskService {

    private tasks:Task[]=[
        { id: 1, title: 'Setup project', description: '', status: 'todo' },
    { id: 2, title: 'Login feature', description: '', status: 'in-progress' },
    { id: 3, title: 'Dashboard UI', description: '', status: 'done' }
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
    
}