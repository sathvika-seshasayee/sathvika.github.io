import { Component } from '@angular/core'
import { Icategories } from './left-side/categories';
import { Itasks } from './task/tasks';

@Component({
    selector:'toDo',
    templateUrl: './toDo.component.html',
    styleUrls:['toDo.component.scss']
})

export class ToDoComponent {
    taskCategory:Icategories = {
    id:  1,
    name : '',
    icon: "fas fa-list-ul",
    tasks: []
}

 task:Itasks = {
     id : 1,
     name:"",
     subTasks:[]
 }
    onTaskCategoryChange(event: any) : void {
        this.taskCategory = event;
        let centerDiv = document.getElementsByClassName("middle-container")[0];
       centerDiv.className = "col-lg-9 col-md-9 middle-container"; 
       let rightDiv = document.getElementsByClassName("right-container")[0];
       rightDiv.className = "d-none right-container "; 
   } 
   onTaskNameClicked(event: any): void {
       this.task = event;
       let centerDiv = document.getElementsByClassName("middle-container")[0];
       centerDiv.className = "col-lg-6 col-md-6 middle-container"; 
       let rightDiv = document.getElementsByClassName("right-container")[0];
       rightDiv.className = "col-lg-3 col-md-3 right-container"; 
   }
   
}