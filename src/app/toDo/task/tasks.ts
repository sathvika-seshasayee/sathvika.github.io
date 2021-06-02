import { IsubTask } from "../sub-task/subTask";

export interface Itasks {
    id:number,
    name:string,
    subTasks: IsubTask[]
}