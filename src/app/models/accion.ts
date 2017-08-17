export interface Accion {
    nombre: String;
    icono?: String;
    accion(e?: any): void;
    // accion: (e?: any) => {} ;    
}

