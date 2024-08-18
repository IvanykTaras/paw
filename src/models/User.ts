import { UserRole } from "../enums/UserRole";
import { IIdentify } from "../interfaces/IIdentify";

export class User implements IIdentify{
    _id: string;
    name: string;
    surname: string;
    role: UserRole;
    password: string;

    constructor(
        _id: string,
        name: string,
        surname: string,
        role: UserRole,
        password: string,
    ){
        this._id = _id
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.password = password;

    }
}