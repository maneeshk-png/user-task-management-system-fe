import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone:true,
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  taskForm!: FormGroup;   // ✅ ONLY declaration here

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    // ✅ Initialize form AFTER fb is available
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['todo']
    });
  }

  submit() {
    if (this.taskForm.invalid) return;

    this.loading = true;

    const formValue = this.taskForm.value;

    const newTask = {
      title: formValue.title ?? '',
      description: formValue.description ?? '',
      status: (formValue.status as 'todo' | 'in-progress' | 'done') ?? 'todo'
    };

    this.taskService.createTask(newTask).subscribe({
      next: () => {
        this.successMessage = 'Task created successfully!';
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 800);
      },
      error: () => {
        this.errorMessage = 'Something went wrong.';
        this.loading = false;
      }
    });
  }
}
