import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { SpinnerService } from '../../services/spinner.service';
import { ConfirmBoxService } from '../../services/confirm-box.service';

@Component({
    selector: 'alumno-edit',
    templateUrl: './alumno-edit.component.html',
    styleUrls: ['./alumno-edit.component.css']
})
export class AlumnoEditComponent implements OnInit {

    alumno: Alumno;

    constructor(
        public spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private usuarioService: UsuarioService,
        private alumnoService: AlumnoService,
        private router: Router,
        private route: ActivatedRoute) { }

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
                    this.router.navigate(['/alumnos']);
                }
                );
        });
    }
}