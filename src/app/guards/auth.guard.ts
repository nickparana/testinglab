import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfirmBoxService } from '../services/confirm-box.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        private cBox: ConfirmBoxService) { }

    canActivate() {
        if (localStorage.getItem('usuario')) {
            return true;
        }
        this.cBox.activate(false, "Su sesión ha expirado. Por favor inicie una nueva sesión.")
            .then()
            .catch(error => {
                console.log(error);
            });
        this.authService.logIn$.next(false);
        localStorage.removeItem('usuario');
        this.router.navigate(['/login']);
        return false;
    }

}