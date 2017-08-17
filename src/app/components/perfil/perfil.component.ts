import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { SpinnerService } from '../../services/spinner.service';
import { ConfirmBoxService } from '../../services/confirm-box.service';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';

@Component({
    selector: 'perfil-root',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

    private active: boolean = false;
    private cBoxMessage: string = "";

    private usuario: Usuario;

    constructor(
        public spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private usuarioService: UsuarioService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.spinner.stop();
        this.getMe();
    }

    ngOnDestroy() {
        this.spinner.start();
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

    gotoEditMe() {
        this.router.navigate(['/usuario-edit', this.usuario._id]);
    }

    goBack(): void {
        this.location.back();
    }

}


