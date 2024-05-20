import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server"


export const GET = async (req, res) => {
    try {
        const result = await prisma.order.findMany({
            where: {
                events: {
                    some: {
                        state: 'FINISHED'
                    }
                },
                updatedAt :{
                    lte: new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).toISOString(),
                    gte: new Date(`${new Date(new Date().getTime() - 12 * 30 * 24 * 3600 * 1000).getFullYear()}-${new Date(new Date().getTime() - 12 * 30 * 24 * 3600 * 1000).getMonth() + 1}-${new Date().getDate(new Date().getTime() - 12 * 30 * 24 * 3600 * 1000)}`).toISOString()
                }
            }
        })

        const salesData = [
            { month: 'sty', sales: 0 },
            { month: 'lut', sales: 0 },
            { month: 'mar', sales: 0 },
            { month: 'kwi', sales: 0 },
            { month: 'maj', sales: 0 },
            { month: 'cze', sales: 0 },
            { month: 'lip', sales: 0 },
            { month: 'sie', sales: 0 },
            { month: 'wrz', sales: 0 },
            { month: 'paź', sales: 0 },
            { month: 'lis', sales: 0 },
            { month: 'gru', sales: 0 }
        ];

        const collection = result.map(x => ({month: `${x.updatedAt.getFullYear()}-${x.updatedAt.getMonth() + 1}-${x.updatedAt.getDate()}`, sales: x.netAmount}))
        const mapDayToMonth = collection.map(x => ({month: convertMonthNumberToString(new Date(x.month).getMonth() + 1), sales: x.sales}))
        mapDayToMonth.forEach((item) => {
            for (const obj of salesData){
                if (obj.month === item.month){
                    obj.sales += item.sales
                }
            }
        })

        return NextResponse.json({status: true, orders: salesData})
    }
    catch (e) {
        return NextResponse.json({status: false})
    }
    finally {
        prisma.$disconnect();
    }
} 


function convertMonthNumberToString(number){
    switch (number){
        case 1:
            return 'sty';
        case 2:
            return 'lut';
        case 3:
            return 'mar';
        case 4:
            return 'kwi';
        case 5:
            return 'maj';
        case 6:
            return 'cze';
        case 7:
            return 'lip';
        case 8:
            return 'sie';
        case 9:
            return 'wrz';
        case 10:
            return 'paź';
        case 11:
            return 'lis';
        case 12:
            return 'gru';
        default:
            return 'Błędny numer miesiąca';
    }
}