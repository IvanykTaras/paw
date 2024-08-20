import { UserRole } from "../enums/UserRole";
import { IUser } from "../interfaces/IUser";

export class AuthorizationAPI {
    private static ulr = "http://localhost:8000/api/authoriazation"
    private static authUrl = "http://localhost:8000/api/authuser"
    
    static async Login(user: IUser) {
        
        const response = await fetch(this.ulr + "/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json" 
             },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        return {accessToken:data.accessToken,refreshToken:data.refreshToken}
    }

    static async Token(refreshToken: string){
        const response = await fetch(this.ulr + "/token",{
            method: "POST",
            headers:{
                "Content-Type": "application/json" 
             },
            body: JSON.stringify({token: refreshToken})
        });
        const data = await response.json();
        return { accessToken: data.accessToken }
    }

    static async Authentication(mail:string){
        const newUser:IUser = {
            name: "mock",
            surname: "mock",
            role: UserRole.Developer,
            password: "mock"
        } 
        const tokens: { accessToken: string, refreshToken: string } = await AuthorizationAPI.Login(newUser);
        const response = await fetch(this.authUrl,{method: "GET"})
        const data: { _id:string,mail: string}[] = await response.json();
        const findMail = data.find(e=>e.mail === mail);
        return { refreshToken: tokens.refreshToken, accessToken: tokens.accessToken, userId: findMail?._id }
    }
}