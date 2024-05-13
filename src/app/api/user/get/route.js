import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    try {
        const data = await req.json()

        const res = await prisma.user.findUnique({
            where: {
                email: data.email
            },
            select: {
                name: true,
                surname: true,
                email: true
            }
        })

        if (res){
            return NextResponse.json({status: true, data: res})
        }

        return NextResponse.json({status: false})
    }
    catch (e){
        return NextResponse.json({status: false})
    }
    finally {
        prisma.$disconnect();
    }
}