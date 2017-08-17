import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Curso } from '../models/curso';

@Injectable()
export class CursoService {

    protected readonly apiUrl = process.env.API_BASE_PATH + '/cursos'; 

      constructor(private http: Http) {    }

    getCursos(): Observable<Curso[]> {
        return this.http
            .get(this.apiUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getCurso(id: number): Observable<Curso> {
        return this.http
            .get(this.apiUrl + '/' + id)
            .map(res => res.json())
            .catch(this.handleError);
    }  

    createCurso(body: Curso): Observable<Curso> {
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

    updateCurso(body: Curso): Observable<Curso> {
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

    deleteCurso(body: Curso): Observable<Curso> {
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
