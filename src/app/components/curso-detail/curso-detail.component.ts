import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Alumno } from '../../models/alumno';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Curso } from '../../models/curso';
import { AlumnoService } from '../../services/alumno.service';
import { CursoService } from '../../services/curso.service';
import { FechaService } from '../../services/fecha.service';
import { SpinnerService } from '../../services/spinner.service';
import { ConfirmBoxService } from '../../services/confirm-box.service';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';

@Component({
    selector: 'curso-detail',
    templateUrl: './curso-detail.component.html',
    styleUrls: ['./curso-detail.component.css']
})

export class CursoDetailComponent implements OnInit {

    private curso: Curso;
    private alumno: Alumno;
    private active: boolean = false;
    private cBoxMessage: string = "";

    constructor(
        public spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private alumnoService: AlumnoService,
        private usuarioService: UsuarioService,
        private cursoService: CursoService,
        private fechaService: FechaService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.spinner.stop();
        this.getCurso();
    }

    ngOnDestroy() {
        this.spinner.start();
    }

    getCurso() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.cursoService.getCurso(id)
                .subscribe(
                curso => this.curso = curso,
                error => {
                    console.log(error);
                    this.cBox.activate(false, "Curso inexistente")
                        .then()
                        .catch(error => {
                            console.log(error);
                        });
                    this.router.navigate(['curso']);
                },
                () => {
                    this.curso.fechaInicio = this.fechaService.getFechaConFormatoSinHora(this.curso.fechaInicio);
                    this.curso.fechaFin = this.fechaService.getFechaConFormatoSinHora(this.curso.fechaFin);
                    this.setDias(this.curso);
                    this.getAlumnoByUsuario();
                }
            );
        });
    }
    
    isAdmin(): Boolean {
        let usuario: Usuario = this.usuarioService.me();
        return usuario.username === 'admin';
    }

    getAlumnoByUsuario() {
        let usuario: Usuario = this.usuarioService.me();
        this.alumnoService.getAlumnoByUsuario(usuario)
            .subscribe(
            alumno => this.alumno = alumno,
            error => {
                console.log(error);
            },
            () => { console.log(this.alumno) });
    }

    deleteCurso(): void {
        this.cBox.activate(true, '¿Desea continuar?')
            .then(result => {
                if (result == true) {
                    this.cursoService.deleteCurso(this.curso)
                        .subscribe(
                        () => { },
                        error => {
                            console.log(error);
                            this.cBox.activate(false, "El curso seleccionado no puede ser eliminado")
                                .then()
                                .catch(error => {
                                    console.log(error);
                                });
                        },
                        () => {
                            this.cBox.activate(false, "Curso eliminado")
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

    gotoEditCurso() {
        this.router.navigate(['/curso-edit', this.curso._id]);
    }

    setDias(curso: Curso) {
        if (curso.dias) {
            let str = "";
            if (curso.dias.lunes) { str += "LUN " }
            if (curso.dias.martes) { str += "MAR " }
            if (curso.dias.miercoles) { str += "MIE " }
            if (curso.dias.jueves) { str += "JUE " }
            if (curso.dias.viernes) { str += "VIE " }
            curso.diasStr = str;
        }
    }

    inscribirseACurso() {
        // if (this.alumno != null) {
        this.alumnoService.inscribirseACurso(this.alumno, this.curso)
            .subscribe(
            () => { },
            (err: any) => console.log(err),
            () => {
                this.cBox.activate(false, "Alumno inscripto")
                    .then()
                    .catch(error => {
                        console.log(error);
                    });
                this.goBack();

            }
            );
        // }
        // else {
        //     this.cBox.activate(false, "No existe un alumno que pueda inscribirse a este curso")
        //         .then()
        //         .catch(error => {
        //             console.log(error);
        //         });
        // }
    }

    desinscribirseACurso() {
        if (this.alumno != null) {
            this.alumnoService.desinscribirseACurso(this.alumno, this.curso)
                .subscribe(
                () => { },
                (err: any) => console.log(err),
                () => {
                    this.cBox.activate(false, "Alumno desinscripto")
                        .then()
                        .catch(error => {
                            console.log(error);
                        });
                    this.goBack();

                }
                );
        }
        else {
            this.cBox.activate(false, "No existe un alumno que pueda inscribirse a este curso")
                .then()
                .catch(error => {
                    console.log(error);
                });
        }
    }

    goBack(): void {
        // this.location.back();
        this.router.navigate(['/cursos']);
    }

}


