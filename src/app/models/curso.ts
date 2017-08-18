import { Accion } from './accion';
import { Dia } from './dia';

export class Curso {

    public _id: number;
    public nombre: String;
    public descripcion: String;
    public fechaInicio: any;
    public fechaFin: any;
    public dias: Dia;
    public horaInicio: any;
    public horaFin: any;
    public cupo: Number;
    public cupoStr: String;
    public acciones: Array<Accion>;

    public estoyInscripto: String;
    public diasStr: String;

    constructor() {
        this.dias = new Dia();
        this.dias.lunes = false;
        this.dias.martes = false;
        this.dias.miercoles = false;
        this.dias.jueves = false;
        this.dias.viernes = false;
    }

}