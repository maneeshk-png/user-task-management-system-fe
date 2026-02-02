import { Injectable } from "@angular/core";
import { delay, map, Observable, of } from "rxjs";
import { User } from "../../core/models/auth.model";
import { StorageService } from "../../core/services/storage.service";

@Injectable({
    providedIn:'root'
})

export class AuthService {
    private dummyUser={id:1,username:'maneesh',password:'maneesh123'};

    constructor(private storage:StorageService){}

//login logic by using observable

    login(username:string,password:string):Observable<User |  null>{
        return of(this.dummyUser).pipe(
            delay(1000),
        map(user=>{
            if(username=== user.username && password=== user.password){

                const safeUser={id:user.id,username:user.username};
                this.storage.setItem('user',safeUser);
            return safeUser;
            }else{
                return null;
            }
        })
        )
    }

    //while logout it will remove the usr details from localstorage
    logout():void {
        this.storage.removeItem('user');
    }


    //function used to get the users from localStorage
    getUser():User | null{
        return this.storage.getItem<User>('user');
    }

    //!! used for converting into boolean
    isLoggedIn():boolean{
        return !!this.getUser();
    }
}