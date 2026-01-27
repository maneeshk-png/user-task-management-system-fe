import { Injectable } from "@angular/core";
import { delay, map, Observable, of } from "rxjs";
import { User } from "../models/user.model";
import { getActiveConsumer } from "@angular/core/primitives/signals";

@Injectable({
    providedIn:'root'
})

export class AuthService {
    private dummyUser={id:1,username:'maneesh',password:'maneesh123'};

    constructor(){}

//login logic by using observable

    login(username:string,password:string):Observable<User |  null>{
        return of(this.dummyUser).pipe(
            delay(1000),
        map(user=>{
            if(username=== user.username && password=== user.password){
                localStorage.setItem('user',JSON.stringify({id:user.id,username:user.username}))
            return {id:user.id,username:user.username}
            }else{
                return null;
            }
        })
        )
    }

    //while logout it will remove the usr details from localstorage
    logout():void {
        localStorage.removeItem('user');
    }


    //function used to get the users from localStorage
    getUser():User | null{
        const userStr=localStorage.getItem('user');
        return userStr?JSON.parse(userStr):null;
    }

    //!! used for converting into boolean
    isLoggedIn():boolean{
        return !!this.getUser();
    }
}