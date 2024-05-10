import { updateSession } from "./lib/session/updateSession";

export async function middleware(req){
    
    return await updateSession(req)
}   