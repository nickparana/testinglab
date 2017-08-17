import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { SpinnerService } from '../../services/spinner.service';
import { ConfirmBoxService } from '../../services/confirm-box.service';

@Component({
    selector: 'usuario-edit',
    templateUrl: './usuario-edit.component.html',
    styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

    usuario: Usuario;

    constructor(
        public spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private usuarioService: UsuarioService,
        private router: Router,
        private route: ActivatedRoute) { }

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
                    this.router.navigate(['/usuarios']);
                }
                );
        });
    }
}