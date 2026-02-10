import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-task-form',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,ButtonComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  // Reactive Form Group for Task
  taskForm!: FormGroup; // Form group instance   

  
  loading = false; // Loading state during API call
  successMessage = '';// Success message after operation
  errorMessage = '';// Error message if operation fails

  isEditMode=false; // Flag to indicate edit mode
  taskId!:number;  // ID of task being edited

  pageReady=false; // Flag to indicate page is ready (data loaded)



  constructor(
    private fb: FormBuilder, // FormBuilder for reactive forms
    private taskService: TaskService,
    private router: Router,
    private route:ActivatedRoute // ActivatedRoute to access route parameters
  ) {
    // Initialize the form with default values and validators
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['todo']
    });
  }

  // On component initialization
ngOnInit(){
  this.route.paramMap.subscribe(params=>{
    const id=params.get('id');

    if(id){
      this.isEditMode=true; // Set edit mode
      this.taskId=+id; // Convert id to number

      this.taskService.getTaskById(this.taskId).subscribe(task=>{ // Fetch task data by ID
        if(!task){
          this.errorMessage='Task Not Found';

          // Redirect to task list after showing error
          setTimeout(()=>{
            this.router.navigate(['/task']);
          },1200)
          return;
        }

        this.taskForm.patchValue(task);  // Populate form with task data
        this.pageReady=true; // Set page ready flag
          //task found update form
      })
    }else{
      this.pageReady=true; // Set page ready flag for new task
    }
  })
}

// Handle form submission for creating or updating a task
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
