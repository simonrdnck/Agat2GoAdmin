import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class DataService {
    private messageSource = new BehaviorSubject('no id');
    currentMessage = this.messageSource.asObservable();
    constructor() { }
    changeMessage(message: string) {
        this.messageSource.next(message);
    }
}
