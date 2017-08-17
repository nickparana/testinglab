import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { SpinnerService } from '../../services/spinner.service';
import { ConfirmBoxService } from '../../services/confirm-box.service';

@Component({
    selector: 'curso-edit',
    templateUrl: './curso-edit.component.html',
    styleUrls: ['./curso-edit.component.css']
})
export class CursoEditComponent implements OnInit {

    curso: Curso;

    constructor(
        public spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private cursoService: CursoService,
        private router: Router,
        private route: ActivatedRoute) { }

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
                    this.router.navigate(['/cursos']);
                }
                );
        });
    }
}