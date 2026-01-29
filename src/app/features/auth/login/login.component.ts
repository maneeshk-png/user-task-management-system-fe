import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { LoginFormConfig } from '../../../configs/forms-config';
import { DynamicFormComponent } from "../../../shared/components/dynamic-form/dynamic-form.component";
import { ButtonComponent } from "../../../shared/components/button/buttton.component";

@Component({
  selector:'app-login',
  standalone:true,
  imports:[DynamicFormComponent,ButtonComponent],
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {
  fields = LoginFormConfig;
  initialData = {};
  loading = false;
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

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
