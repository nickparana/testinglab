import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    constructor(
        private detector: ChangeDetectorRef,
        public spinner: SpinnerService
    ) { }

    ngOnInit() {
        this.spinner.stop();
    }

    ngOnDestroy() {
        this.spinner.start();
    }  

}
