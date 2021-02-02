import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpData {

    tasksFromRequest :any = [];
    constructor(private http : HttpClient) {}

    getData () {
        this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(response => {
            if (response) {
                this.tasksFromRequest = response;
                console.log(this.tasksFromRequest);
            } else alert ('Something wrong!');
        });
    }
}