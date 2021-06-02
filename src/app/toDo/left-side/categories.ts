import { Itasks } from "../task/tasks";

export interface Icategories {
    id:number,
    name:string,
    icon:string
    tasks:Itasks[]
}