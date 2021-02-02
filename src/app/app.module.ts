import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NCompletedComponent } from './n-completed/n-completed.component';
import { CompletedComponent } from './completed/completed.component';
import { TaskComponent } from './task/task.component';
import { HttpData }  from './http.service';


@NgModule({
  declarations: [
    AppComponent,
    NCompletedComponent,
    CompletedComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpData],
  bootstrap: [AppComponent]
})
export class AppModule { }
