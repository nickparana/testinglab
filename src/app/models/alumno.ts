import { Usuario } from './usuario';
import { Accion } from './accion';
import { Curso } from './curso';

export class Alumno {

  public _id: number;
  public usuario: Usuario;
  public edad: Number;
  public regular: boolean;
  public curso: Curso[];
  public acciones: Array<Accion>;

  public nombre: String;
  public apellido: String;
  public email: String;
  public dni: String;
  public cursos: String;
  public username: String;
  public edadStr: String;

  public condicion: String;

  constructor() {
    this.usuario = new Usuario();
  }

}
