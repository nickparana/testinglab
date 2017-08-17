import { Injectable } from '@angular/core';

@Injectable()
export class FechaService {

    getFechaConFormato(fecha: Date): any {
     
        let fechaConFormato: any = '';

        if (fecha != null || fecha != undefined) {
            let dia = ("0" + new Date(fecha).getDate()).slice(-2);
            let mes = ("0" + (new Date(fecha).getMonth() + 1)).slice(-2);
            let año = new Date(fecha).getFullYear();
            let hs = ("0" + new Date(fecha).getHours()).slice(-2);
            let min = ("0" + new Date(fecha).getMinutes()).slice(-2);
            let sec = ("0" + new Date(fecha).getSeconds()).slice(-2);
            fechaConFormato = dia + '/' + mes + '/' + año + ' ' + hs + ':' + min + ':' + sec;
        } 

        return fechaConFormato;
    }

    
    getFechaConFormatoSinHora(fecha: Date): any {
     
        let fechaConFormato: any = '';

        if (fecha != null || fecha != undefined) {
            let dia = ("0" + new Date(fecha).getDate()).slice(-2);
            let mes = ("0" + (new Date(fecha).getMonth() + 1)).slice(-2);
            let año = new Date(fecha).getFullYear();
            fechaConFormato = dia + '/' + mes + '/' + año;
        } 

        return fechaConFormato;
    }


}