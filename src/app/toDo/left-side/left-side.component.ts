import { Component, EventEmitter, Output, OnInit } from '@angular/core'
import { Icategories } from './categories';
import { CategoryService } from './left-side.service';

@Component ({
    selector: 'left-side',
    templateUrl: 'left-side.component.html',
    styleUrls: ['left-side.component.scss'],
    providers: [CategoryService] 
})

export class LeftSideComponent implements OnInit{
    
    constructor(private _categories : CategoryService) {
    }

    categories:Icategories[] = [];

    ngOnInit() {         
        this.categories = this._categories.getCategories();
    }

    newCategory:Icategories = {
        id: this.categories.length + 1,
        name : '',
        icon: "fas fa-list-ul",
        tasks: []
    }

    taskCategoryName:string = "Tasks";

    newCategoryName:string = "";

    @Output()
    taskCategoryNameChanged:EventEmitter<Icategories> = new EventEmitter<Icategories>();

    renderTask(id:number) {
        this.taskCategoryNameChanged.emit(this.categories[id - 1]);
    }

    addNewTaskCategory() {
        this.newCategory = {
            id: this.categories.length + 1,
            name :this.newCategoryName,
            icon: "fas fa-list-ul",
            tasks: []
        }
        this.categories.push(this.newCategory);
        this.newCategoryName = "";
    }
}