import { TaskStatus } from './task-status.type';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
