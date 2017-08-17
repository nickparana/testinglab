import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';

@Component({
    selector: 'alumno-nuevo',
    templateUrl: './alumno-nuevo.component.html',
    styleUrls: ['./alumno-nuevo.component.css']
})
export class AlumnoNuevoComponent implements OnInit { 

    constructor(
          public spinner: SpinnerService
    ){}
    
    ngOnInit(): void {
        this.spinner.stop();   
    }

    ngOnDestroy() {
        this.spinner.start();
    }
    
}
