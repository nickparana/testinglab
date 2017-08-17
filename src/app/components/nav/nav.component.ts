import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { FechaService } from '../../services/fecha.service';

@Component({
    selector: 'nav-root',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

    private activeProductos: boolean = false;
    private activePerfil: boolean = false;
    private userNickname: string;
    private showNav: boolean = false;
    private usuario: Usuario = new Usuario();

    constructor(
        private authService: AuthService,
        private usuarioService: UsuarioService,
        private router: Router,
        private fechaService: FechaService
    ) { }

    ngOnInit() {
        this.checkLoggedIn();
        this.getMe();
    }

    logOut() {
        this.authService.logout();        
    }

    getMe() {
        this.usuarioService.check()
            .subscribe((data: any) => {
                if (localStorage.getItem('usuario')) {
                    let usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
                    this.usuario = usuario;
                }
                else {
                    this.usuario = JSON.parse(data);
                }
            },
            (error: any) => console.log(error));
    }

    checkLoggedIn() {
        this.authService.check()
            .subscribe((data: any) => {
                if (this.authService.loggedIn())
                    data = true;
                this.showNav = data;
            },
            (error: any) => console.log(error));
    }

}