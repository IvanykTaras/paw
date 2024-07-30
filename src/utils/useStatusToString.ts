// import { Status } from "../enums/Status"

export const useStatusToString = (status: string): string | Error=>{
    
    switch (status) {
        case "todo":
            return "secondary"
            break;

        case "doing":
            return "primary"
            break;

        case "done":
            return "success"
            break;

        default:
            throw new Error("Wrong Status!!!");
            break
    }
}