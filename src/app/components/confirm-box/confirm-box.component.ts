import { Component, OnInit, Input, Injectable, trigger, state, style, animate, transition, ViewChild, ElementRef } from '@angular/core';
import { ConfirmBoxService } from '../../services/confirm-box.service';

const KEY_ESC = 27;
const KEY_ENTER = 13;

@Component({
    selector: 'confirm-box-component',
    templateUrl: './confirm-box.component.html',
    styleUrls: ['./confirm-box.component.css'],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({ transform: 'scale3d(.3, .3, .3)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})

@Injectable()
export class ConfirmBoxComponent implements OnInit {
    public title: string;
    public message: string;
    public okText: string;
    public cancelText: string;
    public active: boolean = false;
    public confirm: boolean;

    private _defaults = {
        title: '',
        message: '¿Desea continuar?',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    };
    private _confirmElement: any;
    private _cancelButton: any;
    private _okButton: any;

    constructor(confirmService: ConfirmBoxService) {
        confirmService.activate = this.activate.bind(this);
    }

    private setLabels(message = this._defaults.message, title = this._defaults.title) {
        this.title = title;
        this.message = message;
        this.okText = this._defaults.okText;
        if (!this.confirm) {
            this.cancelText = 'OK';
        }
        else {
            this.cancelText = this._defaults.cancelText;
        }
    }

    activate(confirm: boolean, message = this._defaults.message, title = this._defaults.title) {
        this.confirm = confirm;
        this.setLabels(message, title);
        this.active = true;
        setTimeout(() => {
            this._confirmElement = document.getElementById('confirmationModal');
            this._cancelButton = document.getElementById('cancelButton');
            this._okButton = document.getElementById('okButton');
        }, 0);
        let promise = new Promise<boolean>(resolve => {
            setTimeout(() => { this.show(resolve) }, 0);
        });
        return promise;
    }

    private show(resolve: (boolean: boolean) => any) {
        document.onkeyup = null;

        let negativeOnClick = (e: any) => resolve(false);
        let positiveOnClick = (e: any) => resolve(true);

        if (!this._confirmElement || !this._cancelButton) {
            return;
        }

        this._cancelButton.onclick = ((e: any) => {
            e.preventDefault();
            if (!negativeOnClick(e)) {
                this.hideDialog();
            }
        });

        this._confirmElement.onclick = () => {
            this.hideDialog();
            return negativeOnClick(null);
        };

        document.onkeyup = (e: any) => {
            if (e.which === KEY_ESC || (e.which === KEY_ENTER && !this.confirm)) {
                this.hideDialog();
                return negativeOnClick(null);
            }
        };

        if (!this._okButton) {  // el Ok button esta abajo de todo por si se usa el confirm como alert solamente cancelable
            return;
        }

        this._okButton.onclick = ((e: any) => {
            e.preventDefault();
            if (!positiveOnClick(e)) {
                this.hideDialog();
            }
        });
    }

    private hideDialog() {
        document.onkeyup = null;
        this.active = false;
    }

    ngOnInit(): any {
        // this._confirmElement = document.getElementById('confirmationModal');
        // this._cancelButton = document.getElementById('cancelButton');
        // this._okButton = document.getElementById('okButton');
    }
}
