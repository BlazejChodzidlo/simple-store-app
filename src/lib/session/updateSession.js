import { NextResponse } from "next/server"
import { decrypt, encrypt } from "./jwtOperations"

export const updateSession = async (req) => {
    const session = req.cookies.get('session')?.value

    if (!session) return

    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now() + 3600 * 1000)
    const res = NextResponse.next()
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires
    })

    return res
}