import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    try {
        const data = await req.json()

        const dateObject = new Date()
        const preDateObject = new Date(new Date().getTime() - 30 * 24 * 3600 * 1000)

        const [messages, users, income, orders, support, monthOrders] = await prisma.$transaction([
            prisma.message.count({
                where: {
                    readed: false,
                    user: {
                        email: data.email
                    }
                },
            }),
            prisma.user.count({
                where: {}
            }),
            prisma.order.findMany({
                where: {
                    events: {
                        some: {
                            state: 'FINISHED'
                        }
                    }
                }
            }),
            prisma.order.count({
                where: {
                    events: {
                        some: {
                            state: 'FINISHED'
                        }
                    }
                }
            }),
            prisma.message.count({
                where: {
                    user: {
                        email: 'support@store.com'
                    }
                }
            }),
            prisma.order.count({
                where: {
                    updatedAt: {
                        lte: new Date(`${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`).toISOString(),
                        gte: new Date(`${preDateObject.getFullYear()}-${preDateObject.getMonth() + 1}-${preDateObject.getDate()}`).toISOString()
                    }
                }
            })        ])




        let totalMessages, totalUsers, totalOrders, totalSupport, totalMonthorders = 0

        let totalIncome = 0

        if (JSON.stringify(messages) !== '[]'){
            totalMessages = messages
        }

        if (JSON.stringify(orders) !== '[]'){
            totalOrders = orders
        }

        if (JSON.stringify(users) !== '[]'){
            totalUsers = users
        }

        if (JSON.stringify(support) !== '[]'){
            totalSupport = support
        }

        if (monthOrders !== 0){
            totalMonthorders = monthOrders
        }

        if (JSON.stringify(income) !== '[]'){
            income.forEach((item) => {
                totalIncome += item.netAmount
            })
        }


        return NextResponse.json({status: true, messages: totalMessages, users: totalUsers - 1, income: totalIncome, orders: totalOrders, support: totalSupport, monthOrders: totalMonthorders})
    }
    catch (e){
        return NextResponse.json({status: false})
    }
    finally {
        prisma.$disconnect()
    }
}