import { ITask } from "../interfaces/ITask";
import { Task } from "../models/Task";


export class TaskAPI {
    private static ulr = "http://localhost:8000/api/task"
    public static accessToken = ""


    static async create(task: ITask): Promise<void> {
        
        await fetch(this.ulr,{
            method: "POST",
            headers:{
               "Authorization": "Bearer " + this.accessToken, 
               "Content-Type": "application/json" 
            },
            body: JSON.stringify(task)
        }).catch(e=>console.error(e));
    }

    static async getAll(): Promise<Task[]> {
        
        const response = await fetch(this.ulr,{method: "GET", headers:{"Authorization": "Bearer " + this.accessToken}})
        const data = await response.json();
        return data.map( (t: Task) => new Task(t._id,t.name,t.description,t.priority, t.functionalityId, t.estimatedTime, t.status, t.creationDate, t.startDate, t.completionDate, t.userId))
    }

    static async getById(id:string): Promise<Task> {
        
        const response = await fetch(this.ulr + "/" + id,{method: "GET", headers:{"Authorization": "Bearer " + this.accessToken}})
        const t = await response.json();
        return new Task(t._id,t.name,t.description,t.priority, t.functionalityId, t.estimatedTime, t.status, t.creationDate, t.startDate, t.completionDate, t.userId)
    }

    static async update(task: ITask, id:string): Promise<void> {
        
        await fetch(this.ulr + "/" + id,{
            method: "PUT",
            headers:{
               "Authorization": "Bearer " + this.accessToken, 
               "Content-Type": "application/json" 
            },
            body: JSON.stringify(task)
        }).catch(e=>console.error(e));
    }

    static async delete(id: string){
        await fetch(this.ulr + "/" + id,{
            method: "DELETE",
            headers:{
                "Authorization": "Bearer " + this.accessToken,
                "Content-Type": "application/json" 
            }
        }).catch(e=>console.error(e));
    }
}