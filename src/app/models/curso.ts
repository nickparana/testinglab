import { Accion } from './accion';

export class Curso {

    public _id: number;
    public nombre: String;
    public descripcion: String;
    public fechaInicio: any;
    public fechaFin: any;
    public dias: String[];
    public horaInicio: any;
    public horaFin: any;
    public cupo: Number;
    public acciones: Array<Accion>;

    public estoyInscripto: String;

    constructor() { }

}