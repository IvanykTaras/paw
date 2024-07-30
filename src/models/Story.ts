import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';
import { Project } from './Project';

export class Story {
    id: number;
    name: string;
    description: string;
    priority: Priority;
    project: Project;
    creationDate: Date;
    status: Status;
    ownerId: number;

    constructor(
        id: number,
        name: string,
        description: string,
        priority: Priority,
        project: Project,
        creationDate: Date,
        status: Status,
        ownerId: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.creationDate = creationDate;
        this.status = status;
        this.ownerId = ownerId;
    }
}


/*
Model historyjki:
id,
nazwa, 
opis, 
priorytet (niski/średni/wysoki), 
projekt, 
data utworzenia, 
stan (todo/doing/done), 
właściciel (id użytkownika)
*/