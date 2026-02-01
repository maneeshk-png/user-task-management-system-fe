import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TaskService } from '../services/task.service';
import { TaskSummary } from '../models/task-summary.model';

@Injectable({ providedIn: 'root' })
export class TaskSummaryFacade {

  constructor(private taskService: TaskService) {}

  // Provides aggregated task summary for dashboard / reports
  getSummary() {
    return this.taskService.getTasks().pipe(
      map(tasks => ({
        total: tasks.length,
        todo: tasks.filter(t => t.status === 'todo').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        done: tasks.filter(t => t.status === 'done').length
      } as TaskSummary))
    );
  }
}
