import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpData } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'TODO web application';
  tasks: any = [];
  completedTask: any;
  nCompleted: any;

  constructor(
    private http : HttpClient){}

  ngOnInit(){
    this.http.get('https://jsonplaceholder.typicode.com/todos')
    .subscribe(response => {
        if (response) {
            this.tasks = response; 
            this.completedTask = this.tasks.filter((element: any) => {
              if (element.completed) {return true} else return false;
            }).sort(() => 0.5 - Math.random()).slice(0,10).sort((element1 : any, element2 :any) => {
              if (element1.title > element2.title) {
                return 1
              } else return -1;
            });
            console.log(this.completedTask);
            this.nCompleted = this.tasks.filter((element: any) => {
              if (!element.completed) {return true} else return false;
            }).sort(() => 0.5 - Math.random()).slice(0,10).sort((element1 : any, element2 :any) => {
              if (element1.title > element2.title) {
                return 1
              } else return -1;
            });
            console.log(this.nCompleted);
        } else alert('Something wrong');
    });
  }

  saveTask(){}

  deleteTask(id: number) {
    this.http.delete('https://jsonplaceholder.typicode.com/todos/' + id);
    this.ngOnInit();
  }

}
