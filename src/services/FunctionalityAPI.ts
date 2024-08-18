import { IFunctionality } from "../interfaces/IFunctionality";
import { Functionality } from "../models/Functionality";


export class FunctionalityAPI {
    private static ulr = "http://localhost:8000/api/functionality"


    static async create(functionality: IFunctionality): Promise<void> {
        
        await fetch(this.ulr,{
            method: "POST",
            headers:{
               "Content-Type": "application/json" 
            },
            body: JSON.stringify(functionality)
        }).catch(e=>console.error(e));

    }

    static async getAll(): Promise<Functionality[]> {
        const response = await fetch(this.ulr,{method: "GET"})
        const data = await response.json();
        return data.map( (f: Functionality) => new Functionality(f._id, f.name, f.description, f.status, f.priority, f. projectId, f.userId, f.creationDate))
    }
}