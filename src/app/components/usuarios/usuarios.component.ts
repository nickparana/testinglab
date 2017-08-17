import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from '../../models/select-item';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Location } from '@angular/common';
import { SpinnerService } from '../../services/spinner.service';
import { FechaService } from '../../services/fecha.service';
import { ConfirmBoxService } from '../../services/confirm-box.service';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';
import { Accion } from '../../models/accion';

@Component({
    selector: 'usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

    usuarios: Usuario[];
    private active: boolean = false;

    private usuariosCount: number;

    private selectItems: Array<SelectItem> = [
        // { name: 'Todos', value: ''},
        { name: 'Nombre', value: 'nombre' },
        { name: 'Apellido', value: 'apellido' },
        { name: 'DNI', value: 'dni' },
        { name: 'E-mail', value: 'email' },
        { name: 'Username', value: 'username' }
    ];

    public columnas: Array<any> = [
        // { titulo: 'Id', nombreProp: 'id', ruta: 'id', sort: '' },
        { titulo: 'Nombre', nombreProp: 'nombre', ruta: 'nombre', sort: '' },
        { titulo: 'Apellido', nombreProp: 'apellido', ruta: 'apellido', sort: '' },
        { titulo: 'DNI', nombreProp: 'dni', ruta: 'dni', sort: '' },
        { titulo: 'E-mail', nombreProp: 'email', ruta: 'email', sort: '' },
        { titulo: 'Username', nombreProp: 'username', ruta: 'username', sort: '' },
    ];

    constructor(
        private detector: ChangeDetectorRef,
        private location: Location,
        private spinner: SpinnerService,
        private cBox: ConfirmBoxService,
        private fechaService: FechaService,
        private usuarioService: UsuarioService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.spinner.stop();
        this.getUsuarios();
    }

    ngOnDestroy() {
        this.spinner.start();
    }

    getUsuarios(): void {
        this.usuarioService.getUsuarios()
            .subscribe(
            usuarios => this.usuarios = usuarios,
            error => console.log(error),
            () => {
                this.usuarios.forEach((usuario: Usuario) => {
                    usuario.acciones = [];
                    this.agregarAcciones(usuario);
                });
            });
    }

    eliminarUsuario(usuario: Usuario): any {
        this.cBox.activate(true, '¿Desea eliminar este usuario?')
            .then((result: any) => {
                if (result == true) {
                    this.usuarioService.deleteUsuario(usuario)
                        .subscribe(
                        () => {
                            this.cBox.activate(false, "Usuario eliminado")
                                .then()
                                .catch((error: any) => {
                                    console.log(error);
                                });
                        },
                        (error: any) => {
                            console.log(error);
                            this.cBox.activate(false, error)
                                .then()
                                .catch((error: any) => {
                                    console.log(error);
                                });
                        },
                        () => {
                            this.getUsuarios();
                        });
                }
            }).catch((error: any) => {
                console.log(error);
            });
    }

    editarUsuario(usuario: Usuario): any {
        this.router.navigate(['/usuario-edit/' + usuario._id])
    }

    verDetailsUsuario(usuario: Usuario): any {
        this.router.navigate(['/usuario-detail/' + usuario._id])
    }

    agregarAcciones(usuario: Usuario) {

        usuario.acciones.push({
            nombre: "Detalles",
            icono: 'fa-eye',
            accion: this.verDetailsUsuario.bind(this)
        });


        usuario.acciones.push({
            nombre: "Editar",
            icono: 'fa-pencil',
            accion: this.editarUsuario.bind(this)
        });

        usuario.acciones.push({
            nombre: "Eliminar",
            icono: 'fa-trash-o',
            accion: this.eliminarUsuario.bind(this)
        });
    }

    goBack(): void {
        this.location.back();
    }

}

