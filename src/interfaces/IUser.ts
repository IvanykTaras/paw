import { UserRole } from "../enums/UserRole";

export interface IUser{
    name: string;
    surname: string;
    role: UserRole;
    password: string;
}