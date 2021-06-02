import { Component , Input, EventEmitter, Output} from '@angular/core';
import { Icategories } from '../left-side/categories';
import { Itasks } from './tasks';

@Component({
    selector: 'center-part',
    templateUrl: 'task.component.html',
    styleUrls : ['task.component.scss']
})
export class TaskComponent {

    @Input()
    taskCategory:Icategories= {
        id:  1,
        name : "My Day",
        icon: "fas fa-list-ul",
        tasks: []
    }
    newTaskName:string = '';

    isChecked = false;
 
    @Output()
    taskNameClicked:EventEmitter<Itasks> = new EventEmitter<Itasks>();

    renderSubTask(taskId : number) {
        this.taskNameClicked.emit(this.taskCategory.tasks[taskId - 1]);
    }

    addNewTask() {
        let newTask: Itasks = {
            id: 1,
            name: '',
            subTasks: []
        };
       newTask.id =  this.taskCategory.tasks.length + 1;
       newTask.name = this.newTaskName;
       this.taskCategory.tasks.push(newTask);
       this.newTaskName = "";
    }

    completedOrNot(id:number, event:any) {
        console.log(event);
        console.log(event.target.checked);
        if(event.target.checked) {
            let taskNameSpan  = document.getElementsByClassName("taskName")[0];       
           taskNameSpan.className = "taskName strikeOut";
        } else {
            let taskNameSpan  = document.getElementsByClassName("taskName")[0];       
           taskNameSpan.className = "taskName";
        }
    }
    
}
