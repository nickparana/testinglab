import { Component, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmBoxService } from '../../services/confirm-box.service';

@Component({
    selector: 'usuario-form',
    templateUrl: './usuario-form.component.html',
    styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent {

    public message: string = "";
    @Input() editMode: boolean;
    formError: boolean = false;
    submitted: boolean;

    @Input() newUsuario: Usuario = new Usuario();

    private emailCheck: string;
    private passwordCheck: string;

    constructor(
        private usuarioService: UsuarioService,
        private alumnoService: AlumnoService,
        private router: Router,
        private location: Location,
        private detector: ChangeDetectorRef,
        private cBox: ConfirmBoxService
    ) { }

    resetFormAndGoBack(form: any) {
        if (this.submitted) {
            this.submitted = false;
            this.formError = false;
            form.reset();
            // this.router.navigate([this.goBackUrl]);
            this.goBack();
        }
    }

    onSubmit(form: any): void {

        if (this.emailCheck != this.newUsuario.email) {
            this.cBox.activate(false, "Los e-mail ingresados no coinciden")
                .then()
                .catch(error => {
                    console.log(error);
                });
            return;
        }     

        if (this.passwordCheck != this.newUsuario.password && (this.passwordCheck.length > 0 && this.newUsuario.password.length > 0)) {
            this.cBox.activate(false, "Las contraseñas ingresadas no coinciden")
                .then()
                .catch(error => {
                    console.log(error);
                });
            return;
        }

        if (form.valid) {
            this.submitted = true;
            let me: Usuario = this.usuarioService.me();
            if (this.editMode) {
                this.usuarioService.updateUsuario(this.newUsuario)
                    .subscribe(
                    usuario => {
                        if (me._id == usuario._id) { // si modifico los datos del que esta logueado, actualizo nombre en navbar
                            localStorage.setItem('usuario', JSON.stringify(usuario));
                            this.usuarioService.usuario$.next(usuario);
                        }
                        this.cBox.activate(false, "Usuario actualizado")
                            .then()
                            .catch(error => {
                                console.log(error);
                            });
                    },
                    error => console.log(error),
                    () => this.resetFormAndGoBack(form));
            }
            else {
                this.usuarioService.createUsuario(this.newUsuario)
                    .subscribe(
                    usuario => {

                        //Aca creo el alumno tambien, no queda muy bien, pero salio andando.
                        let newAlumno: Alumno = new Alumno();
                        newAlumno.usuario = usuario;
                        newAlumno.edad = 0;
                        newAlumno.regular = true;

                        this.alumnoService.createAlumno(newAlumno)
                            .subscribe(
                            alumno => {                     
                                console.log('Alumno creado tambien');
                            },
                            error => {
                                console.log(error);
                            },
                            () => {});

                        this.cBox.activate(false, "Usuario creado")
                            .then()
                            .catch(error => {
                                console.log(error);
                            });
                    },
                    error => {
                        this.cBox.activate(false, "El username escogido ya se encuentra en uso")
                            .then()
                            .catch(error => {
                                console.log(error);
                            });
                        console.log(error);
                    },
                    () => this.resetFormAndGoBack(form));
            }
        }
        else {
            this.formError = true;
            this.submitted = false;
        }
    }

    goBack(): void {
        this.location.back();
    }

}