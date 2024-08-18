import { ITask } from "../interfaces/ITask";
import { Task } from "../models/Task";


export class TaskAPI {
    private static ulr = "http://localhost:8000/api/task"


    static async create(task: ITask): Promise<void> {
        
        await fetch(this.ulr,{
            method: "POST",
            headers:{
               "Content-Type": "application/json" 
            },
            body: JSON.stringify(task)
        }).catch(e=>console.error(e));
    }

    static async getAll(): Promise<Task[]> {
        
        const response = await fetch(this.ulr,{method: "GET"})
        const data = await response.json();
        console.dir(data)
        return data.map( (t: Task) => new Task(t._id,t.name,t.description,t.priority, t.functionalityId, t.estimatedTime, t.status, t.creationDate, t.startDate, t.completionDate, t.userId))
    }

    static async getById(id:string): Promise<Task> {
        
        const response = await fetch(this.ulr + "/" + id,{method: "GET"})
        const t = await response.json();
        console.dir(t)
        return new Task(t._id,t.name,t.description,t.priority, t.functionalityId, t.estimatedTime, t.status, t.creationDate, t.startDate, t.completionDate, t.userId)
    }

    static async update(task: ITask, id:string): Promise<void> {
        
        await fetch(this.ulr + "/" + id,{
            method: "PUT",
            headers:{
               "Content-Type": "application/json" 
            },
            body: JSON.stringify(task)
        }).catch(e=>console.error(e));
    }
}