import { NextRequest} from "next/server";
import { decodeToken } from "./handleJwt";
import { PoolConnection } from "mysql2/promise";
import { executeQuery } from "./handleDatabase";
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

export async function getUserBlog(connection:PoolConnection,email:string):Promise<string[]>{
    try{
        if(!email){
            return []
        }
        const res= await executeQuery(connection,'SELECT ID FROM BLOG WHERE CREATED_BY=?;',[email])
        let result:string[]=[];
        // @ts-ignore
        res.map(ele=>result.push(ele.ID))
        return result;
    }
    catch(err){
        console.log(err)
        return [];
    }
}


export async function checkOwnership(connection:PoolConnection,email:string,blogId:string) {
    let result=await getUserBlog(connection,email);
    return result.filter(id => id === blogId).length>0;
}