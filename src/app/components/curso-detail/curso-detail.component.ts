import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Alumno } from '../../models/alumno';
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
    private active: boolean = false;
    private cBoxMessage: string = "";

    constructor(
        public spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private alumnoService: AlumnoService,
        private cursoService: CursoService,
        private fechaService: FechaService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    public columnas: Array<any> = [
        // { titulo: 'Id', nombreProp: 'id', ruta: 'id', sort: '' },
        { titulo: 'Nombre', nombreProp: 'nombre', ruta: 'nombre', sort: '' },
        { titulo: 'Día', nombreProp: 'dia', ruta: 'dia', sort: '' },
        { titulo: 'Horario', nombreProp: 'horario', ruta: 'horario', sort: '' },
        { titulo: 'Fecha Inicio', nombreProp: 'fechaInicio', ruta: 'fechaInicio', sort: '' },
        { titulo: 'Fecha Fin', nombreProp: 'fechaFin', ruta: 'fechaFin', sort: '' },
        { titulo: 'Cupo', nombreProp: 'cupo', ruta: 'cupo', sort: '' }
    ];

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
                }
                );
        });
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

    inscribirseACurso() {
        let alumno: Alumno = null;  // vert si lo busco del localStg
        this.alumnoService.inscribirseACurso(alumno, this.curso);
    }

    goBack(): void {
        // this.location.back();
        this.router.navigate(['/cursos']);
    }

}


