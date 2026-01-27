import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { Router, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";


@Component({
    selector:'app-login',
    standalone:true,
    imports:[ReactiveFormsModule,CommonModule],
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})


export class LoginComponent implements OnInit {
    loginForm!:FormGroup;
    loading=false;
    errorMsg='';

    constructor(private fb:FormBuilder,private authService:AuthService,private router:Router){}

    ngOnInit(): void {
        this.loginForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });
      }
      submit(): void {
        if (this.loginForm.invalid) {
          return;
        }
        this.loading=true;
        this.errorMsg='';

        const {username,password}=this.loginForm.value;

        this.authService.login(username,password).subscribe(user=>{
            this.loading=false;

            if(user){
                this.router.navigate(['/dashboard']);
            }else{
                this.errorMsg='Invalid username or password'
            }
        })
}
}