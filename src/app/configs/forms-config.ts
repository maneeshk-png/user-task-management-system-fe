// forms-config.ts
import { Validators } from '@angular/forms';

export const LoginFormConfig = [
  { name: 'username', label: 'Username', type: 'text', validators: [Validators.required], placeholder: 'Enter username' },
  { name: 'password', label: 'Password', type: 'password', validators: [Validators.required], placeholder: 'Enter password' }
];

export const TaskFormConfig = [
  { name: 'title', label: 'Title *', type: 'text', validators: [Validators.required] },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'status', label: 'Status', type: 'select', options: [
      { label: 'Todo', value: 'todo' },
      { label: 'In Progress', value: 'in-progress' },
      { label: 'Done', value: 'done' },
    ]
  }
];
