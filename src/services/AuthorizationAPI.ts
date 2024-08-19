import { IUser } from "../interfaces/IUser";

export class AuthorizationAPI {
    private static ulr = "http://localhost:8000/api/authoriazation"
    
    static async Login(user: IUser) {
        
        const response = await fetch(this.ulr + "/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json" 
             },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.dir(data)
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
        console.dir(data)
        return { accessToken: data.accessToken }
    }
}