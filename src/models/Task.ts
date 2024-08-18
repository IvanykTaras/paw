import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';
import { UserRole } from '../enums/UserRole';
import { IIdentify } from '../interfaces/IIdentify';



export class Task implements IIdentify{
    _id: string;
    name: string;
    description: string;
    priority: Priority;
    functionalityId: string;
    estimatedTime: Date; 
    status: Status;
    creationDate: Date;
    startDate?: Date;
    completionDate?: Date;
    userId?: string;

    constructor(
        _id: string,
        name: string,
        description: string,
        priority: Priority,
        functionalityId: string,
        estimatedTime: Date,
        status: Status,
        creationDate: Date,
        startDate?: Date,
        completionDate?: Date,
        userId?: string,
    ) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.functionalityId = functionalityId;
        this.estimatedTime = estimatedTime;
        this.status = status;
        this.creationDate = creationDate;
        this.startDate = startDate;
        this.completionDate = completionDate;
        this.userId = userId;
    }
}
