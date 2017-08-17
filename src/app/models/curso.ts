import { Accion } from './accion';

export class Curso {

    public _id: number;
    public nombre: String;
    public descripcion: String;
    public fechaInicio: Date;
    public fechaFin: Date;
    public dias: String[];
    public horaInicio: Date;
    public horaFin: Date;
    public cupo: Number;
    public acciones: Array<Accion>;

    public estoyInscripto: String;

    constructor() { }

}