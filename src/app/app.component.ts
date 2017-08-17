import { Component } from '@angular/core';
import '../../public/css/styles.css';
import '../../public/img/favicon.ico';
import 'font-awesome/css/font-awesome.css';
import { AuthService } from './services/auth.service';
import { SpinnerComponent } from './components/spinner/spinner.component';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'Leiva Cargas';

    constructor() { }

}