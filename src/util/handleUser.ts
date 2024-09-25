import { NextRequest} from "next/server";
import { decodeToken } from "./handleJwt";
export async function getUser(request:NextRequest): Promise<{ email: string } | null>{

    let access_token = request.cookies.get('access-token')?.value;

    if (!access_token || typeof access_token !== 'string') { 
        return null;
    }
    access_token = access_token?.split(" ")[1]; 
    let decodedToken;
    try {
        decodedToken = await decodeToken(access_token);
    } catch (err) {
        console.log(err)
        return null
    }
    return decodedToken;
}

export async function deleteUser(request:NextRequest){
    return request.cookies.delete('access-token');
}