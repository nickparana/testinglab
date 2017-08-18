import { Component, Input, OnInit, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Page } from '../../models/page';
import { Accion } from '../../models/accion';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
    selector: 'tabla-root',
    templateUrl: './tabla.component.html',
    styleUrls: ['./tabla.component.css']
})

export class TablaComponent implements OnInit, OnChanges {

    @Input() private showInput: boolean;
    @Input() private showSelect: boolean;
    @Input() private showAcciones: boolean = true;

    @Input() private data: Array<any> = [];
    @Input() private columnas: Array<any> = [];

    @Output() inputSearchEmitter: EventEmitter<any> = new EventEmitter<any>();

    private searchFilter: any = '';
    @Input() private filter: any = '';  // filter estado por defecto antes de renderizar

    @Input() selectItems: Array<any> = [];

    ngOnInit() { }

    ngOnChanges(changes: any) {
    }   

    changeFilter(filter: any) {
        this.filter = filter;
        this.search(this.searchFilter);
    }

    cancelEvent(event: any) {
        event.preventDefault();
    }

    search(searchString: String) {
        this.searchFilter = searchString;
        let filter = this.filter
    }

}