import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { SpinnerService } from '../../services/spinner.service';
import { ConfirmBoxService } from '../../services/confirm-box.service';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';

@Component({
    selector: 'usuario-detail',
    templateUrl: './usuario-detail.component.html',
    styleUrls: ['./usuario-detail.component.css']
})

export class UsuarioDetailComponent implements OnInit {

    private me: Usuario;

    private usuario: Usuario;
    private active: boolean = false;
    private cBoxMessage: string = "";

    constructor(
        public spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private usuarioService: UsuarioService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.me = this.usuarioService.me();
     }

    ngOnInit(): void {
        this.spinner.stop();
        this.getUsuario();
    }

    ngOnDestroy() {
        this.spinner.start();
    }

    getUsuario() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.usuarioService.getUsuario(id)
                .subscribe(
                usuario => this.usuario = usuario,
                error => {
                    console.log(error);
                    this.cBox.activate(false, "Usuario inexistente")
                                    .then()
                                    .catch(error => {
                                        console.log(error);
                                    });
                    this.router.navigate(['usuarios']);
                }
                );
        });
    }

    deleteUsuario(): void {
        this.cBox.activate(true,'¿Desea continuar?')
            .then(result => {
                if (result == true) {
                    this.usuarioService.deleteUsuario(this.usuario)
                        .subscribe(
                        () => { },
                        error => {
                            console.log(error);
                            this.cBox.activate(false, "El usuario seleccionado no puede ser eliminado")
                                    .then()
                                    .catch(error => {
                                        console.log(error);
                                    });
                        },
                        () => {
                            this.cBox.activate(false, "Usuario eliminado")
                                    .then()
                                    .catch(error => {
                                        console.log(error);
                                    });
                            this.goBack()
                        });
                }
            }).catch(error => {
                console.log(error);
            });
    }

    gotoEditUsuario() {
        this.router.navigate(['/usuario-edit', this.usuario._id]);
    }

    goBack(): void {
        // this.location.back();
        this.router.navigate(['/usuarios']);
    }

}


