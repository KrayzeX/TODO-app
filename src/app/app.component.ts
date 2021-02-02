import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODO web application';
  tasks : any = [];

  constructor(private http : HttpClient){}

  ngOnInit(){
    this.http.get('https://jsonplaceholder.typicode.com/posts')
    .subscribe(response => {
        if (response) {
            this.tasks = response;
            console.log(this.tasks); 
        } else alert('Something wrong');
    });
  }

}
