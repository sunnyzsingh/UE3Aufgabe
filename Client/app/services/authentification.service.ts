import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {Http} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
    counter: number = 0;

    constructor(private http: Http) {
    }

    login(username: string, password: string) {
        let ob = {username: username, password: password};
        return this.http.post('http://localhost:8081/onSubmit', ob).map((response) => response.json());
    }


    counterLogin()
    {

        this.counter++;
    }


    getCount()
    {
        return this.counter;
    }
}