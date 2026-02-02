import { CanActivate, Router} from "@angular/router";
import { AuthService } from "../../features/auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    
    constructor(private authService:AuthService, private router:Router){}

    canActivate():boolean{
        if(!this.authService.isLoggedIn()){
           this.router.navigate(['/login']);
           return false;
        }
        return true;
    }
}

//protectes routes for dashboard,tasks.