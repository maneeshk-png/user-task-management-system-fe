import { Validators } from '@angular/forms';

// Schema definition for the login form fields
export const LoginFormSchema = [
  { name: 'username', label: 'Username', type: 'text', validators: [Validators.required], placeholder: 'Enter username' },
  { name: 'password', label: 'Password', type: 'password', validators: [Validators.required], placeholder: 'Enter password' }
];