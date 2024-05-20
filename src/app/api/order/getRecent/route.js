import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        const data = await prisma.order.findMany({
            where: {
                events: {
                    some: {
                        state: 'FINISHED'
                    }
                },
            },
            include: {
                user: true
            },
            take: 10
        })

        return NextResponse.json({status: true, sales: data})
    }
    catch (e) {
        return NextResponse.json({status: false})
    }
    finally {
        prisma.$disconnect();
    }
}