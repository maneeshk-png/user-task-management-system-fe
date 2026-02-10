import { FilterOption } from "../../../shared/models/filter-option.model";
import { TaskStatus } from "../models/task-status.type";


export const STATUS_FILTER_OPTIONS: FilterOption<TaskStatus | 'all'>[] = [
  { label: 'All', value: 'all' },
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Done', value: 'done' }
];
