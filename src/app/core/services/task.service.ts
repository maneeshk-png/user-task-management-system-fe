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
    ]

    getTasks():Observable<Task[]> {
        return of(this.tasks).pipe(delay(1000));
    }
}