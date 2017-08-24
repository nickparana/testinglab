import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from '../../models/select-item';
import { Location } from '@angular/common';
import { SpinnerService } from '../../services/spinner.service';
import { FechaService } from '../../services/fecha.service';
import { ConfirmBoxService } from '../../services/confirm-box.service';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';
import { Accion } from '../../models/accion';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Dia } from '../../models/dia';

@Component({
    selector: 'cursos',
    templateUrl: './cursos.component.html',
    styleUrls: ['./cursos.component.css']
})

export class CursosComponent implements OnInit {

    cursos: Curso[];
    usuario: Usuario;
    private active: boolean = false;

    private selectItems: Array<SelectItem> = [
        // { name: 'Todos', value: ''},
        { name: 'Nombre', value: 'nombre' },
        { name: 'Días', value: 'diasStr' },
        { name: 'Fecha Inicio', value: 'fechaInicio' },
        { name: 'Fecha Fin', value: 'fechaFin' },
        { name: 'Hora Inicio', value: 'horaInicio' },
        { name: 'Hora Fin', value: 'horaFin' },
        { name: 'Cupo', value: 'cupoStr' }
    ];

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

    constructor(
        private detector: ChangeDetectorRef,
        private location: Location,
        private spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private fechaService: FechaService,
        private cursoService: CursoService,
        private alumnoService: AlumnoService,
        private usuarioService: UsuarioService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.spinner.stop();
        this.getCursos();
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

    getCursos(): void {
        this.cursoService.getCursos()
            .subscribe(
            cursos => this.cursos = cursos,
            error => console.log(error),
            () => {
                this.cursos.forEach((curso: Curso) => {
                    curso.fechaInicio = this.fechaService.getFechaConFormatoSinHora(curso.fechaInicio);
                    curso.fechaFin = this.fechaService.getFechaConFormatoSinHora(curso.fechaFin);
                    curso.cupoStr = curso.cupo.toString();
                    this.setDias(curso);
                    curso.acciones = [];
                    this.agregarAcciones(curso);
                });
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
    
    eliminarCurso(curso: Curso): any {
        this.cBox.activate(true, '¿Desea eliminar este curso?')
            .then((result: any) => {
                if (result == true) {
                    this.cursoService.deleteCurso(curso)
                        .subscribe(
                        () => {
                            this.cBox.activate(false, "Curso eliminado")
                                .then()
                                .catch((error: any) => {
                                    console.log(error);
                                });
                        },
                        (error: any) => {
                            console.log(error);
                            this.cBox.activate(false, error)
                                .then()
                                .catch((error: any) => {
                                    console.log(error);
                                });
                        },
                        () => {
                            this.getCursos();
                        });
                }
            }).catch((error: any) => {
                console.log(error);
            });
    }

    editarCurso(curso: Curso): any {
        this.router.navigate(['/curso-edit/' + curso._id])
    }

    verDetailsCurso(curso: Curso): any {
        this.router.navigate(['/curso-detail/' + curso._id])
    }

    agregarAcciones(curso: Curso) {

        curso.acciones.push({
            nombre: "Detalles",
            icono: 'fa-eye',
            accion: this.verDetailsCurso.bind(this)
        });

        if (this.usuario.username === 'admin') {
            curso.acciones.push({
                nombre: "Editar",
                icono: 'fa-pencil',
                accion: this.editarCurso.bind(this)
            });
    
            curso.acciones.push({
                nombre: "Eliminar",
                icono: 'fa-trash-o',
                accion: this.eliminarCurso.bind(this)
            });
        };
    }

    goBack(): void {
        this.location.back();
    }

}

