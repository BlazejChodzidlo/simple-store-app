import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server"
import * as bcrypt from 'bcrypt'
import { encrypt } from "@/lib/session/jwtOperations"
import { cookies } from "next/headers"

export const POST = async (req, res) => {
    try {
        const data = await req.json()
        
        const res = await prisma.user.findUnique({
            where: {
                email: data.email
            },
            select: {
                email: true,
                name: true,
                admin: true,
                password: true
            }
        })

        if (res){
            if (bcrypt.compareSync(data.password, res.password)){
                const expires = new Date(Date.now() + 3600 * 1000)
                const session = await encrypt({email: data.email, name: res.name, admin: res.admin, expires})
    
                cookies().set('session', session, {expires, httpOnly: true})
    
                return NextResponse.json({status: true})
            }
            else {
                return NextResponse.json({status: false, message: "Incorrect password."})
            }
        }
        else {
            return NextResponse.json({status: false, message: 'Incorrect email!'})
        }
    }
    catch (e) {
        NextResponse.json({status: false})
    }
    finally {
        prisma.$disconnect()
    }
}