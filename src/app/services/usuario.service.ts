import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Usuario } from '../models/usuario';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class UsuarioService {

    protected readonly apiUrl = process.env.API_BASE_PATH + '/usuarios';

    usuario: Usuario = null;
    usuario$: Subject<Usuario> = new BehaviorSubject<Usuario>(this.usuario);
    externalBS: any;

    constructor(private http: Http) {
        this.usuario$.asObservable();
        this.externalBS = this.usuario$;
    }

    check() { // para esconder el navbar
        return this.externalBS.asObservable().startWith(this.usuario);
    }

    getUsuarios(): Observable<Usuario[]> {
        return this.http
            .get(this.apiUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }


    getUsuario(id: number): Observable<Usuario> {
        return this.http
            .get(this.apiUrl + '/' + id)
            .map(res => res.json())
            .catch(this.handleError);
    }


    me(): Usuario {
        let _usuario = localStorage.getItem('usuario');
        if (_usuario !== null && _usuario !== undefined) {
            this.usuario = JSON.parse(_usuario);
        }
        return this.usuario;
    }

    createUsuario(body: Usuario): Observable<Usuario> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers
        });

        return this.http
            .post(this.apiUrl, bodyString, options)
            .map(res => res.json())
            .catch(this.handleError)
    }

    updateUsuario(body: Usuario): Observable<Usuario> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers
        });

        return this.http
            .put(this.apiUrl + '/' + body._id, bodyString, options)
            .map(res => res.json())
            .catch(this.handleError)
    }

    deleteUsuario(body: Usuario): Observable<Usuario> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers
        });

        return this.http
            .delete(this.apiUrl + '/' + body._id, options)
            .map(res => res.json())
            .catch(this.handleError)
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

}
