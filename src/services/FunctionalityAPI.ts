import { IFunctionality } from "../interfaces/IFunctionality";
import { Functionality } from "../models/Functionality";


export class FunctionalityAPI {
    private static ulr = "http://localhost:8000/api/functionality"
    public static accessToken = ""


    static async create(functionality: IFunctionality): Promise<void> {
        
        await fetch(this.ulr,{
            method: "POST",
            headers:{
               "Authorization": "Bearer " + this.accessToken, 
               "Content-Type": "application/json" 
            },
            body: JSON.stringify(functionality)
        }).catch(e=>console.error(e));

    }

    static async getAll(): Promise<Functionality[]> {
        const response = await fetch(this.ulr,{method: "GET", headers:{"Authorization": "Bearer " + this.accessToken}})
        const data = await response.json();
        return data.map( (f: Functionality) => new Functionality(f._id, f.name, f.description, f.status, f.priority, f. projectId, f.userId, f.creationDate))
    }

    static async getById(id:string): Promise<Functionality> {
        const response = await fetch(this.ulr + '/' + id ,{method: "GET", headers:{"Authorization": "Bearer " + this.accessToken}})
        const f = await response.json();
        return new Functionality(f._id, f.name, f.description, f.status, f.priority, f. projectId, f.userId, f.creationDate)
    }

    static async update(func: IFunctionality, id:string): Promise<void> {
        
        await fetch(this.ulr + "/" + id,{
            method: "PUT",
            headers:{
               "Authorization": "Bearer " + this.accessToken, 
               "Content-Type": "application/json" 
            },
            body: JSON.stringify(func)
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