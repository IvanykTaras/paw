import { ITask } from "../interfaces/ITask";
import { Task } from "../models/Task";
import { User } from "../models/User";


export class UserAPI {
    private static ulr = "http://localhost:8000/api/user"


    static async getAll(): Promise<User[]> {
        const response = await fetch(this.ulr,{method: "GET"})
        const data = await response.json();
        return data.map( (u: User) => new User(u._id,u.name,u.surname,u.role,u.password)) 
    }

    static async getById(id:string): Promise<User> {
        
        const response = await fetch(this.ulr + "/" + id,{method: "GET"})
        const u: User = await response.json();
        return new User(u._id,u.name,u.surname,u.role,u.password);
    }


}