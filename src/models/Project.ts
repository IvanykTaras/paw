import { IIdentify } from "../interfaces/IIdentify";

export class Project implements IIdentify{
    _id: string;
    name: string;
    description: string;

    constructor( _id:string, name: string, description: string) {
        this._id = _id;
        this.name = name;
        this.description = description;
    }
}