import { Priority } from "../enums/Priority";
import { Status } from "../enums/Status";

export interface IFunctionality{
    name: string;
    description: string;
    priority: Priority;
    projectId: string;
    creationDate?: Date;
    status?: Status;
    userId: string;
}