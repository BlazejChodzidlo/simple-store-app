import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        const res = await prisma.user.findMany({
            where: {
                email: {
                    not: 'support@store.com'
                }
            },
            include: {
                orders: true
            }
        })

        const data = res.map((user) => {
            let cost = 0

            user.orders.forEach((order) => {
                cost += order.netAmount
            })

            return {...user, amount: cost, count: user.orders.length}
        })

        return NextResponse.json({status: true, users: data})
    }
    catch (e){
        return NextResponse.json({status: false})
    }
    finally {
        prisma.$disconnect();
    }
}