import { Priority } from "../enums/Priority";
import { Status } from "../enums/Status";
import { IFunctionality } from "../interfaces/IFunctionality";
import { IIdentify } from "../interfaces/IIdentify";

export class Functionality implements IIdentify, IFunctionality{
    _id: string;
    name: string;
    description: string;
    status: Status;
    priority: Priority;
    projectId: string;
    userId: string;
    creationDate: Date;

    constructor(
        _id: string,
        name: string,
        description: string,
        status: Status,
        priority: Priority,
        projectId: string,
        userId: string,
        creationDate: Date
    ){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.projectId = projectId;
        this.userId = userId;
        this.creationDate = creationDate;
    }



}