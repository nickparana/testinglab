import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, Request, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class AuthService {

    isLoggedIn: boolean = false;
    logIn$: Subject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn);
    externalBS: any;

    protected readonly apiUrlAuthenticate = process.env.API_BASE_PATH + '/authenticate';
    protected readonly apiUrlUsuarios = process.env.API_BASE_PATH + '/usuarios/';

    private usuarios: Usuario[];
    private errorMessage: String;

    constructor(
        private http: Http,
        private router: Router,
        private usuarioService: UsuarioService
    ) {
        this.logIn$.asObservable();
        this.externalBS = this.logIn$;
    }

    login(username: String, password: String): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers
        });

        return this.http.post(this.apiUrlAuthenticate,
            JSON.stringify({ username: username, password: password }), options)
            .map((res: Response) => {
                let loggedIn = res.json().success;
                if (loggedIn) {
                    localStorage.setItem('logged_in', loggedIn);
                    this.isLoggedIn = true;
                    this.logIn$.next(this.isLoggedIn);

                    let usuario: Usuario = res.json().usuario;
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    this.usuarioService.usuario$.next(usuario);

                    this.router.navigate(['/cursos']);

                    return true;
                }
                return false;

            })
            .catch(this.errorHandler);
    }

    loggedIn() {
        return localStorage.getItem('logged_in')
    }

    check() { // para esconder el navbar        
        return this.externalBS.asObservable().startWith(this.isLoggedIn);
    }

    logout() {        
        localStorage.removeItem('logged_in');
        this.isLoggedIn = false;
        this.logIn$.next(this.isLoggedIn);
        localStorage.removeItem('usuario');
        this.usuarioService.usuario$.next(null);
        this.router.navigate(['/login']);
    }

    private handleError(error: Response | any) {  // SACADO DE ANG2 DOC    
        let errMsg: String;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private errorHandler(error: Response | any) {
        console.log("Error: ", error)
        let errMsg: String;
        switch (error.status) {
            case 401:
                errMsg = "Nombre de usuario o Password incorrecto. Intente nuevamente."
                break;
            case 500:
                errMsg = "Usuario inexistente. Intente nuevamente."
                break;
            case 0:
                errMsg = "Problema de conexión con el servidor. Intente nuevamente."
                break;
            default:
                errMsg = "Ocurrió un problema al intentar ingresar. Intente nuevamente."
                break;
        }
        return Observable.throw(errMsg);
    }

}