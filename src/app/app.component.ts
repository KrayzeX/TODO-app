import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'TODO web application';
  tasks: any = [];
  task: any = {};
  taskTitle: any = '';
  taskStatus: any =[{completed: true,
                     status: "Done"},
                    {completed: false,
                     status: "To do"}];
  completedTask: any;
  nCompleted: any;
  activeId: any;
  postData: any = {};
  updateData:any = {};

  constructor(
    private http : HttpClient
    ){}

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
            
            this.nCompleted = this.tasks.filter((element: any) => {
              if (!element.completed) {return true} else return false;
            }).sort(() => 0.5 - Math.random()).slice(0,10).sort((element1 : any, element2 :any) => {
              if (element1.title > element2.title) {
                return 1
              } else return -1;
            });
        } else alert('Something wrong');
    });
  }
  
  toggle(id: number) {
    this.activeId = id;
  }

  selectTask(id: number) {
    this.toggle(id);
    this.http.get('https://jsonplaceholder.typicode.com/todos/' + id).subscribe(response => {
      if (response) {
        this.task = response;
        this.taskTitle = this.task.title;
      } else alert('Something wrong');
    });
  }

  createTask(taskTitle: string, status: string) {
    if (status == "To do"){
      this.postData = {title: taskTitle, completed: false};
      this.nCompleted.push(this.postData);
    } else {
      this.postData = {title: taskTitle, compiled: true};
      this.completedTask.push(this.postData);
    }
    this.http.post('https://jsonplaceholder.typicode.com/todos', this.postData);

  }

  updateTask(taskTitle: string, status: string, id: number) {
    if (status == "To do") {
      this.updateData = {title: taskTitle, completed: false, id: id};
      this.completedTask = this.completedTask.filter((item: any) => item.id !== id);
      this.nCompleted = this.nCompleted.filter((item: any) => item.id !== id);
      this.taskTitle = '';
      this.task.completed = '';
      this.nCompleted.push(this.updateData);
    } else {
      this.updateData = {title: taskTitle, completed: true, id: id};
      this.completedTask = this.completedTask.filter((item: any) => item.id !== id);
      this.nCompleted = this.nCompleted.filter((item: any) => item.id !== id);
      this.taskTitle = '';
      this.task.completed = ''; 
      this.completedTask.push(this.updateData);
    }
    this.http.put("https://jsonplaceholder.typicode.com/todos/" + id, this.updateData)
    .subscribe(data => console.log(data));
  }

  deleteTask(id: number) {
    this.http.delete('https://jsonplaceholder.typicode.com/todos/' + id);
    this.completedTask = this.completedTask.filter((item: any) => item.id !== id);
    this.nCompleted = this.nCompleted.filter((item: any) => item.id !== id);  
    this.taskTitle = '';
    this.task.completed = '';
  }

}
