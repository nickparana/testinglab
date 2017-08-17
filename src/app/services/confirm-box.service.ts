import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class ConfirmBoxService {
    public activate: (confirm?: boolean, message?: String, title?: String) => Promise<boolean>;
}