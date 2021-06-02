import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ToDoComponent } from './toDo.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { TaskComponent } from './task/task.component';
import { SubTaskComponent } from './sub-task/subTask.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ToDoComponent,
    LeftSideComponent,
    TaskComponent,
    SubTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ToDoModule { }