import { FilterOption } from "../core/models/filter-option.model";
import { TaskStatus } from "../core/models/task-status.type";


export const STATUS_FILTER_OPTIONS: FilterOption<TaskStatus | 'all'>[] = [
  { label: 'All', value: 'all' },
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Done', value: 'done' }
];
