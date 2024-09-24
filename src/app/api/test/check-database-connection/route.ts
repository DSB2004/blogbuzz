import DATABASE_INSTANCE from "@/lib/db";
import { getConnection} from "@/util/handleDatabase";
import { NextRequest} from "next/server";
import { PoolConnection } from "mysql";


export async function GET(request: NextRequest) {
    let connection: PoolConnection | undefined;
    try {
       
        connection = await getConnection(DATABASE_INSTANCE);
       if (connection){
           return new Response(JSON.stringify({msg:"Connection established"}));
        }
        

    } catch (error) {
        console.error('Error happended:', error);
        return new Response(
            JSON.stringify({ msg: `Internal Server Error ${error}` }),
            { status: 500 }
        );
    } finally {
        connection?.release()

    }
}
