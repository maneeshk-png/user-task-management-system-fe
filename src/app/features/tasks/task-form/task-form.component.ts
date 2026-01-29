import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { TaskFormConfig } from '../../../configs/forms-config';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { ButtonComponent } from '../../../shared/components/button/buttton.component';

@Component({
  selector: 'app-task-form',
  standalone:true,
  imports:[DynamicFormComponent,ButtonComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  fields = TaskFormConfig;
  taskData: any = {};
  loading = false;
  successMessage = '';
  errorMessage = '';
  isEditMode = false;
  taskId!: number;
  pageReady = false;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id){
        this.isEditMode = true;
        this.taskId = +id;
        this.taskService.getTaskById(this.taskId).subscribe(task => {
          if(!task){
            this.errorMessage = 'Task Not Found';
            setTimeout(() => this.router.navigate(['/task']), 1200);
            return;
          }
          this.taskData = task;
          this.pageReady = true;
        });
      } else {
        this.pageReady = true;
      }
    });
  }

  onTaskSubmit(data: any) {
    this.loading = true;
    if(this.isEditMode){
      this.taskService.updateTask(this.taskId, data).subscribe({
        next: () => { this.successMessage = 'Task Updated!'; setTimeout(() => this.router.navigate(['/task']),800);}
      });
    } else {
      this.taskService.createTask(data).subscribe({
        next: () => { this.successMessage = 'Task Created!'; this.loading = false; setTimeout(() => this.router.navigate(['/task']),800);}
      });
    }
  }
}
