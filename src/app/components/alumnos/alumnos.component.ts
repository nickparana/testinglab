import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from '../../models/select-item';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Location } from '@angular/common';
import { SpinnerService } from '../../services/spinner.service';
import { FechaService } from '../../services/fecha.service';
import { ConfirmBoxService } from '../../services/confirm-box.service';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';
import { Accion } from '../../models/accion';
import { Curso } from '../../models/curso';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';

@Component({
    selector: 'alumnos',
    templateUrl: './alumnos.component.html',
    styleUrls: ['./alumnos.component.css']
})

export class AlumnosComponent implements OnInit {

    alumnos: Alumno[];
    private active: boolean = false;

    private selectItems: Array<SelectItem> = [
        // { name: 'Todos', value: ''},
        { name: 'Nombre', value: 'nombre' },
        { name: 'Apellido', value: 'apellido' },
        { name: 'DNI', value: 'dni' },
        { name: 'E-mail', value: 'email' },
        { name: 'Username', value: 'username' },
        { name: 'Edad', value: 'edadStr' },
        { name: 'Condición', value: 'condicion' },
    ];

    public columnas: Array<any> = [
        // { titulo: 'Id', nombreProp: 'id', ruta: 'id', sort: '' },
        { titulo: 'Nombre', nombreProp: 'nombre', ruta: 'usuario.nombre', sort: '' },
        { titulo: 'Apellido', nombreProp: 'apellido', ruta: 'usuario.apellido', sort: '' },
        { titulo: 'DNI', nombreProp: 'dni', ruta: 'usuario.dni', sort: '' },
        { titulo: 'E-mail', nombreProp: 'email', ruta: 'usuario.email', sort: '' },
        { titulo: 'Edad', nombreProp: 'edadStr', ruta: 'edadStr', sort: '' },
        // { titulo: 'Inscripto en', nombreProp: 'cursos', ruta: 'cursos', sort: '' },
        { titulo: 'Condición', nombreProp: 'condicion', ruta: 'condicion', sort: '' },
    ];

    constructor(
        private detector: ChangeDetectorRef,
        private location: Location,
        private spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private fechaService: FechaService,
        private usuarioService: UsuarioService,
        private alumnoService: AlumnoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.spinner.stop();
        this.getAlumnos();
    }

    ngOnDestroy() {
        this.spinner.start();
    }

    getAlumnos(): void {
        this.alumnoService.getAlumnos()
            .subscribe(
            alumnos => this.alumnos = alumnos,
            error => console.log(error),
            () => {
                this.alumnos.forEach((alumno: Alumno) => {
                    alumno.acciones = [];
                    this.agregarAcciones(alumno);
                    alumno.nombre = alumno.usuario.nombre;
                    alumno.apellido = alumno.usuario.apellido;
                    alumno.dni = alumno.usuario.dni;
                    alumno.email = alumno.usuario.email;
                    alumno.edadStr = alumno.edad.toString();
                    alumno.cursos = "";
                    alumno.regular ? alumno.condicion = "Regular" : alumno.condicion = "No regular";
                    this.agregarCursos(alumno);
                });
            });
    }

    agregarCursos(alumno: Alumno) {
        if (alumno.curso) {
            alumno.curso.forEach((curso: Curso) => {
                if (curso != null || curso != undefined) {
                    alumno.cursos = alumno.cursos.concat(curso.nombre + " ");
                }
            });
        }

    }

    eliminarAlumno(alumno: Alumno): any {
        this.cBox.activate(true, '¿Desea eliminar este alumno?')
            .then((result: any) => {
                if (result == true) {
                    this.alumnoService.deleteAlumno(alumno)
                        .subscribe(
                        () => {
                            this.cBox.activate(false, "Alumno eliminado")
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
                            this.getAlumnos();
                        });
                }
            }).catch((error: any) => {
                console.log(error);
            });
    }

    editarAlumno(alumno: Alumno): any {
        this.router.navigate(['/alumno-edit/' + alumno._id])
    }

    verDetailsAlumno(alumno: Alumno): any {
        this.router.navigate(['/alumno-detail/' + alumno._id])
    }

    agregarAcciones(alumno: Alumno) {

        alumno.acciones.push({
            nombre: "Detalles",
            icono: 'fa-eye',
            accion: this.verDetailsAlumno.bind(this)
        });

        alumno.acciones.push({
            nombre: "Editar",
            icono: 'fa-pencil',
            accion: this.editarAlumno.bind(this)
        });

        alumno.acciones.push({
            nombre: "Eliminar",
            icono: 'fa-trash-o',
            accion: this.eliminarAlumno.bind(this)
        });
    }

    goBack(): void {
        this.location.back();
    }

}

