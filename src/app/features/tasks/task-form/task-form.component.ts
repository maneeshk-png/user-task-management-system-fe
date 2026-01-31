import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/buttton.component';

@Component({
  selector: 'app-task-form',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,ButtonComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  taskForm!: FormGroup;   // ✅ ONLY declaration here

  loading = false;
  successMessage = '';
  errorMessage = '';

  isEditMode=false;
  taskId!:number;

  pageReady=false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    // ✅ Initialize form AFTER fb is available
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['todo']
    });
  }

ngOnInit(){
  this.route.paramMap.subscribe(params=>{
    const id=params.get('id');

    if(id){
      this.isEditMode=true;
      this.taskId=+id;

      this.taskService.getTaskById(this.taskId).subscribe(task=>{
        if(!task){
          this.errorMessage='Task Not Found';

          setTimeout(()=>{
            this.router.navigate(['/task']);
          },1200)
          return;
        }

        this.taskForm.patchValue(task); 
        this.pageReady=true;
          //task found update form
      })
    }else{
      this.pageReady=true;
    }
  })
}

  submit() {

    if(this.loading) return;
    if (this.taskForm.invalid) return;

    this.loading = true;

    const formValue = this.taskForm.value;

    const newTask = {
      title: formValue.title ?? '',
      description: formValue.description ?? '',
      status: (formValue.status as 'todo' | 'in-progress' | 'done') ?? 'todo'
    };

    //updated Task
    if(this.isEditMode){
      this.taskService.updateTask(this.taskId,newTask).subscribe({
        next:()=>{
          this.successMessage='Task Updated Successfully!';
          
          setTimeout(()=>{
            this.router.navigate(['/task']);
          },800);
        }
      })
      return;
    }

    //Create Task
    this.taskService.createTask(newTask).subscribe({
      next: () => {
        this.successMessage = 'Task created successfully!';
        this.taskForm.reset();
        this.loading=false;
        setTimeout(() => {
          this.router.navigate(['/task']);
        }, 800);
      },
      error: () => {
        this.errorMessage = 'Something went wrong.';
        this.loading = false;
      }
    });
  }
}
