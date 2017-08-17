import { Accion } from './accion';

export class Usuario {

  public _id: number;
  public username: String;
  public password: String;
  public nombre: String;
  public apellido: String;
  public dni: String;
  public email: String;
  public acciones: Array<Accion>;

  constructor() { }

}
