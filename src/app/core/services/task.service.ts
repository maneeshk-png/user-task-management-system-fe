import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { delay, Observable, of, throwError } from "rxjs";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: 'root' })
export class TaskService {

  private storageKey = 'tasks';

  constructor(private storage: StorageService) {}

  // Always read fresh from localStorage
  private get tasks(): Task[] {
    return this.storage.getItem<Task[]>(this.storageKey) || [];
  }

  private saveTasks(tasks: Task[]): void {
    this.storage.setItem(this.storageKey, tasks);
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks).pipe(delay(500));
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    const tasks = this.tasks;

    const newTask: Task = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title: task.title!,
      description: task.description || '',
      status: task.status || 'todo'
    };

    tasks.push(newTask);
    this.saveTasks(tasks);

    return of(newTask).pipe(delay(500));
  }

  updateTask(id: number, updated: Omit<Task, 'id'>): Observable<void> {
    const tasks = this.tasks;
    const index = tasks.findIndex(t => t.id === id);

    if (index !== -1) {
      tasks[index] = { id, ...updated };
      this.saveTasks(tasks);
    }

    return of(void 0).pipe(delay(500));
  }

  deleteTask(id: number): Observable<void> {
    const tasks = this.tasks;
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
      return throwError(() => new Error('Task not Found'));
    }

    tasks.splice(index, 1);
    this.saveTasks(tasks);

    return of(void 0).pipe(delay(500));
  }

  getTaskById(id: number): Observable<Task | undefined> {
    const task = this.tasks.find(t => t.id === id);
    return of(task).pipe(delay(500));
  }
}
