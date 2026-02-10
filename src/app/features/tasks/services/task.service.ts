import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { delay, Observable, of, throwError } from "rxjs";
import { StorageService } from "../../../core/services/storage.service";

@Injectable({ providedIn: 'root' })
export class TaskService {

  private storageKey = 'tasks';

  constructor(private storage: StorageService) {}

  // Always read fresh from localStorage
  private get tasks(): Task[] {
    return this.storage.getItem<Task[]>(this.storageKey) || [];
  }



  // Save tasks to localStorage
  private saveTasks(tasks: Task[]): void {
    this.storage.setItem(this.storageKey, tasks);
  }



  // Fetch all tasks with a simulated delay
  getTasks(): Observable<Task[]> {
    return of(this.tasks).pipe(delay(500)); //wrap the data in an observable and add a delay of 500ms
  }


// Create a new task
  createTask(task: Omit<Task, 'id'>): Observable<Task> {

// Validation FIRST
if (!task.title || task.title.trim() === '') {
  return throwError(() => new Error('Title is required'));
}

    const tasks = this.tasks;

    const newTask: Task = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1, // auto-increment ID
      title: task.title!, // trim the title to remove whitespace
      description: task.description || '', // default to empty string
      status: task.status || 'todo' // default status
    };



      // Add new task and save
    tasks.push(newTask);
    this.saveTasks(tasks);
    // Return the newly created task with a delay
    return of(newTask).pipe(delay(500));
  }



  // Update an existing task
  updateTask(id: number, updated: Omit<Task, 'id'>): Observable<void> { // omit id from updated data
    const tasks = this.tasks; // get current tasks
    const index = tasks.findIndex(t => t.id === id); // find task index



    // If task found, update and save
    if (index !== -1) {
      tasks[index] = { id, ...updated };
      this.saveTasks(tasks);
    }


// If not found, throw error
    return of(void 0).pipe(delay(500));
  }

  
// Delete a task by ID
  deleteTask(id: number): Observable<void> {
    const tasks = this.tasks;
    const index = tasks.findIndex(task => task.id === id);


// If task not found, throw error
    if (index === -1) {
      return throwError(() => new Error('Task not Found'));
    }


// Remove task and save
    tasks.splice(index, 1);
    this.saveTasks(tasks);
// Return void observable with delay
    return of(void 0).pipe(delay(500));
  }


// Get a task by ID
  getTaskById(id: number): Observable<Task | undefined> {
    const task = this.tasks.find(t => t.id === id);
    return of(task).pipe(delay(500));
  }
}
