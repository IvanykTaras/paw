import { Priority } from "../enums/Priority";
import { Status } from "../enums/Status";

export interface ITask{
        name: string;
        description: string;
        priority: Priority;
        functionalityId: string;
        estimatedTime: Date;
        status: Status;
        creationDate?: Date ;
        startDate?: Date | null;
        completionDate?: Date | null;
        userId?: string | null
}