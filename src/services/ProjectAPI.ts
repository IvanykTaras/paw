import { IProject } from "../interfaces/IProject";
import { Project } from "../models/Project";


export class ProjectAPI {
    private static ulr = "http://localhost:8000/api/project"


    static async create(project: IProject): Promise<void> {
        
        await fetch(this.ulr,{
            method: "POST",
            headers:{
               "Content-Type": "application/json" 
            },
            body: JSON.stringify(project)
        }).catch(e=>console.error(e));
    }

    static async getAll(): Promise<Project[]> {
        
        const response = await fetch(this.ulr,{method: "GET"})
        const data = await response.json();
        return data.map( (project: Project) => new Project(project._id, project.name, project.description))
    }
}