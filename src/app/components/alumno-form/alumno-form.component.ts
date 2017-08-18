import { Component, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmBoxService } from '../../services/confirm-box.service';

@Component({
    selector: 'alumno-form',
    templateUrl: './alumno-form.component.html',
    styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent {

    public message: string = "";
    @Input() editMode: boolean;
    formError: boolean = false;
    submitted: boolean;

    @Input() newAlumno: Alumno = new Alumno();

    private emailCheck: string;
    private passwordCheck: string;

    constructor(
        private usuarioService: UsuarioService,
        private alumnoService: AlumnoService,
        private router: Router,
        private location: Location,
        private detector: ChangeDetectorRef,
        private cBox: ConfirmBoxService
    ) { 
        if (!this.editMode){
           this.getUsuario();
        }        
    }

    getUsuario(){
        let usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
        this.newAlumno.usuario = usuario;
    }

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
     
        if (form.valid) {
            this.submitted = true;
            let me: Usuario = this.usuarioService.me();
            if (this.editMode) {
                this.alumnoService.updateAlumno(this.newAlumno)
                    .subscribe(
                    alumno => {
                        if (me._id == alumno.usuario._id) { // si modifico los datos del que esta logueado, actualizo nombre en navbar
                            localStorage.setItem('usuario', JSON.stringify(alumno.usuario));
                            this.usuarioService.usuario$.next(alumno.usuario);
                        }
                        this.cBox.activate(false, "Alumno actualizado")
                            .then()
                            .catch(error => {
                                console.log(error);
                            });
                    },
                    error => console.log(error),
                    () => this.resetFormAndGoBack(form));
            }
            else {
                this.alumnoService.createAlumno(this.newAlumno)
                    .subscribe(
                    alumno => {                     
                        this.cBox.activate(false, "Alumno creado")
                            .then()
                            .catch(error => {
                                console.log(error);
                            });
                    },
                    error => {
                     
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

    changeCondicion(value: boolean){
        this.newAlumno.regular = value;
    }

    goBack(): void {
        this.location.back();
    }

}