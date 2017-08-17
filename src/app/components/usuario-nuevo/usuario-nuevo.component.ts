import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';

@Component({
    selector: 'usuario-nuevo',
    templateUrl: './usuario-nuevo.component.html',
    styleUrls: ['./usuario-nuevo.component.css']
})
export class UsuarioNuevoComponent implements OnInit { 

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
