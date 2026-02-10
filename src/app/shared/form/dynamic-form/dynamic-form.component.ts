import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'; 
import { ButtonComponent } from '../../ui/button/button.component';
import { FormField } from './models/form-field.model';

@Component({
  selector: 'app-dynamic-form',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,ButtonComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormField[] = [];

  // Default values for form fields (used for edit / prefill scenarios
  @Input() initialData: any = {};
  @Input() submitLabel = 'Submit';
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<any>();

  form!: FormGroup;

  ngOnInit() {
    const group: any = {};

     // Dynamically create form controls from field
    this.fields.forEach(f => {
      group[f.name] = new FormControl(this.initialData[f.name] || '', f.validators || []);
    });
    this.form = new FormGroup(group);
  }

  onSubmit() {
    if (this.form.valid) this.submitForm.emit(this.form.value);
    else this.form.markAllAsTouched();
  }

  isInvalid(field: FormField) {
    const control = this.form.get(field.name);
    return control?.invalid && control?.touched;
  }
}