import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        const res = await prisma.order.findMany({
            include: {
                events: true,
                user: {
                    select: {
                        email: true
                    }
                }
            },
        })

        if (res){
            const data = res.map((order) => {
                return {...order, email: order.user.email, status: order.events[order.events.length - 1].state}
            })

            return NextResponse.json({status: true, orders: data})
        }
        else {
            return NextResponse.json({status: false})
        }
    }
    catch (e) {
        return NextResponse.json({status: false})
    }
    finally {
        prisma.$disconnect();
    }
}