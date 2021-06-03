import { Component, Input, EventEmitter } from '@angular/core'
import { Itasks } from '../task/tasks';
import { IsubTask } from './subTask';

@Component ({
    selector: 'sub-task',
    templateUrl: 'subTask.component.html',
    styleUrls:['subTask.component.scss']
})

export class SubTaskComponent {
    @Input()
    task:Itasks = {
        id : 1,
        name :'new',
        subTasks:[]
    };

    newSubTaskName:string = "";
  addNewSubTask() {
       let newSubTask:IsubTask = {
           id: this.task.subTasks.length + 1,
           name: this.newSubTaskName
       }
       this.task.subTasks.push(newSubTask);
       this.newSubTaskName = "";
  }

  completedOrNot(id:number, event:any) {
    if(event.target.checked) {
        let taskNameSpan  = document.getElementsByClassName("taskName")[0];       
       taskNameSpan.className = "taskName strikeOut";
    } else {
        let taskNameSpan  = document.getElementsByClassName("taskName")[0];       
       taskNameSpan.className = "taskName";
    }
}
    
}