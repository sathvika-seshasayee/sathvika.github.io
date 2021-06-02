import { Injectable } from "@angular/core";
import { Icategories } from "./categories";

@Injectable()
export class CategoryService {
    getCategories() : Icategories[] {
        return [{
                    id: 1,
                    name: "My Day",
                    icon: "far fa-sun",
                    tasks: []
                },
                {
                    id: 2,
                    name: "Important",
                    icon: "far fa-star",
                    tasks: []
                },
                {
                    id: 3,
                    name: "Planned",
                    icon: "far fa-calendar",
                    tasks: []
                },
                {
                    id: 4,
                    name: "Assigned to you",
                    icon: "fas fa-user-alt",
                    tasks: []
                },
                {
                    id: 5,
                    name: "Tasks",
                    icon: "fas fa-home",
                    tasks: []
                }
        ];
    }
}


