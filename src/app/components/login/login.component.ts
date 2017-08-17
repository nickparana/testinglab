import { Component, ElementRef, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { SpinnerService } from '../../services/spinner.service';
import { Headers, Http, Response, Request, RequestOptions, RequestMethod } from '@angular/http';
import '../../../../public/img/logo.png';
import { UsuarioService } from '../../services/usuario.service';
import { ConfirmBoxService } from '../../services/confirm-box.service';

@Component({
    selector: 'login-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    private usuario = new Usuario();
    private loginError: boolean;
    private id_token: any;

    constructor(
        public spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private authService: AuthService,
        private router: Router,
        private usuarioService: UsuarioService,
        private detector: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.spinner.stop();
        if (this.authService.loggedIn())
            this.router.navigate(['/alumnos']);
    }

    ngOnDestroy() {
        this.spinner.start();
    }

    onSubmit() {
        this.authService.login(this.usuario.username, this.usuario.password)
            .subscribe(result => {
                if (result === true) {
                    (id_token: any) => this.id_token = id_token;
                }
            },
            (error: String) => {
                this.cBox.activate(false, error)
                    .then()
                    .catch(error => {
                        console.log(error);
                    });
            });
    }

    goToRegister(): void{
         this.router.navigate(['/usuario-nuevo']);
    }

}