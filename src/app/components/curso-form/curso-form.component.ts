import { Component, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmBoxService } from '../../services/confirm-box.service';

@Component({
    selector: 'curso-form',
    templateUrl: './curso-form.component.html',
    styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent {

    public message: string = "";
    @Input() editMode: boolean;
    formError: boolean = false;
    submitted: boolean;

    @Input() newCurso: Curso = new Curso();

    private dias: String[] = [];

    constructor(
        private cursoService: CursoService,
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
            this.goBack();
        }
    }

    setDias(value: any) {
        console.log(value)
        // this.dias.forEach((dia: any) => {
        //     console.log(dia)
        //     if (dia == value) {
        //         this.dias.splice(this.dias.indexOf(dia), 1);
        //     }
        //     else {
        //         this.dias.push(value);
        //     }
        // });
        // this.newCurso.dias = this.dias;
        console.log(this.newCurso.fechaFin);
        console.log(this.newCurso.horaFin)
    }

    onSubmit(form: any): void {
        if (form.valid) {
            this.submitted = true;
            if (this.editMode) {
                this.cursoService.updateCurso(this.newCurso)
                    .subscribe(
                    curso => {
                        this.cBox.activate(false, "Curso actualizado")
                            .then()
                            .catch(error => {
                                console.log(error);
                            });
                    },
                    error => console.log(error),
                    () => this.resetFormAndGoBack(form));
            }
            else {
                this.cursoService.createCurso(this.newCurso)
                    .subscribe(
                    curso => {
                        this.cBox.activate(false, "Curso creado")
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

    goBack(): void {
        this.location.back();
    }

}