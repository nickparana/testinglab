import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Alumno } from '../../models/alumno';
import { Curso } from '../../models/curso';
import { AlumnoService } from '../../services/alumno.service';
import { FechaService } from '../../services/fecha.service';
import { SpinnerService } from '../../services/spinner.service';
import { ConfirmBoxService } from '../../services/confirm-box.service';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';

@Component({
    selector: 'alumno-detail',
    templateUrl: './alumno-detail.component.html',
    styleUrls: ['./alumno-detail.component.css']
})

export class AlumnoDetailComponent implements OnInit {

    private alumno: Alumno;
    private active: boolean = false;
    private cBoxMessage: string = "";

    constructor(
        public spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private alumnoService: AlumnoService,
        private fechaService: FechaService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    public columnas: Array<any> = [
        // { titulo: 'Id', nombreProp: 'id', ruta: 'id', sort: '' },
        { titulo: 'Nombre', nombreProp: 'nombre', ruta: 'nombre', sort: '' },
        { titulo: 'Días', nombreProp: 'diasStr', ruta: 'diasStr', sort: '' },
        { titulo: 'Hora Inicio', nombreProp: 'horaInicio', ruta: 'horaInicio', sort: '' },
        { titulo: 'Hora Fin', nombreProp: 'horaFin', ruta: 'horaFin', sort: '' },
        { titulo: 'Fecha Inicio', nombreProp: 'fechaInicio', ruta: 'fechaInicio', sort: '' },
        { titulo: 'Fecha Fin', nombreProp: 'fechaFin', ruta: 'fechaFin', sort: '' },
        { titulo: 'Cupo', nombreProp: 'cupoStr', ruta: 'cupoStr', sort: '' },
        // { titulo: 'Estoy inscripto', nombreProp: 'estoyInscripto', ruta: 'estoyInscripto', sort: '' }
    ];

    ngOnInit(): void {
        this.spinner.stop();
        this.getAlumno();
    }

    ngOnDestroy() {
        this.spinner.start();
    }

    getAlumno() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.alumnoService.getAlumno(id)
                .subscribe(
                alumno => this.alumno = alumno,
                error => {
                    console.log(error);
                    this.cBox.activate(false, "Alumno inexistente")
                        .then()
                        .catch(error => {
                            console.log(error);
                        });
                    this.router.navigate(['alumnos']);
                },
                () => {
                    this.alumno.curso.forEach((curso: Curso) => {
                        // curso.fechaInicio = this.fechaService.getFechaConFormatoSinHora(curso.fechaInicio);
                        // curso.fechaFin = this.fechaService.getFechaConFormatoSinHora(curso.fechaFin);
                        curso.fechaInicio = this.fechaService.getFechaConFormatoSinHora(curso.fechaInicio);
                        curso.fechaFin = this.fechaService.getFechaConFormatoSinHora(curso.fechaFin);
                        curso.cupoStr = curso.cupo.toString();
                        this.setDias(curso);
                    });
                }
                );
        });
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

    deleteAlumno(): void {
        this.cBox.activate(true, '¿Desea continuar?')
            .then(result => {
                if (result == true) {
                    this.alumnoService.deleteAlumno(this.alumno)
                        .subscribe(
                        () => { },
                        error => {
                            console.log(error);
                            this.cBox.activate(false, "El alumno seleccionado no puede ser eliminado")
                                .then()
                                .catch(error => {
                                    console.log(error);
                                });
                        },
                        () => {
                            this.cBox.activate(false, "Alumno eliminado")
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

    gotoEditAlumno() {
        this.router.navigate(['/alumno-edit', this.alumno._id]);
    }

    goBack(): void {
        // this.location.back();
        this.router.navigate(['/alumnos']);
    }

}


