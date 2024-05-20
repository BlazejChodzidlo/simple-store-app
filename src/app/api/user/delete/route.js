import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    try {
        const data = await req.json()

        const result = await prisma.user.delete({
            where: {
                id: data
            }
        })

        if (result){
            return NextResponse.json({status: true})
        }
        else {
            return NextResponse.json({status: false})
        }

        
    }
    catch (e){
        return NextResponse.json({status: false})
    }
    finally {
        prisma.$disconnect();
    }
}