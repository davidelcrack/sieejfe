import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthenticationGuard implements CanActivate {
 
    constructor(private router: Router) { }
  
    canActivate() {
        console.log(localStorage.getItem('USER'));
        if (localStorage.getItem('USER')) {   
            console.log('Entro');         
            return true;
        }
        
        console.log('No Entro');
        this.router.navigate(['/login']);
        return false;
    }
}