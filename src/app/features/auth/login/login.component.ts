import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { DynamicFormComponent } from "../../../shared/components/dynamic-form/dynamic-form.component";
import { LoginFormSchema } from "./login-form.schema";

@Component({
  selector:'app-login',
  standalone:true, // Standalone component (Angular 21 style)
  imports:[DynamicFormComponent], // Uses reusable dynamic form component
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {
  // Dynamic form field configuration for login (username, password)
  fields = LoginFormSchema;

   // Controls loading state during API call
  loading = false;

  // Stores authentication error message
  errorMsg = '';

  // Dependency injection of AuthService and Router
  constructor(private authService: AuthService, private router: Router) {}

// Handles form submission for login
  onLogin(data: any) {
    this.loading = true;
    this.errorMsg = '';
    const { username, password } = data;

    this.authService.login(username, password).subscribe(user => {
      this.loading = false;
      if(user) this.router.navigate(['/dashboard']);
      else this.errorMsg = 'Invalid username or password';
    });
  }
}
