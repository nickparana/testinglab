import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';

@Component({
    selector: 'curso-nuevo',
    templateUrl: './curso-nuevo.component.html',
    styleUrls: ['./curso-nuevo.component.css']
})
export class CursoNuevoComponent implements OnInit { 

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
