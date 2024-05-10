import { cookies } from "next/headers";

export const logout = async () => {
    cookies().set('session', '', {expires: new Date(0)})
}