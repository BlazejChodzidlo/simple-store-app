import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';

export const POST = async (req, res) => {
    try {
        const data = await req.json();

        const emailExists = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (emailExists){
            return NextResponse.json({status: false, message: "An account with the given email address already exists."})
        }
        else {
            const hashedPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))

        const res = await prisma.user.create({
            data: {
                name: data.name,
                surname: data.surname,
                password: hashedPassword,
                email: data.email,
                admin: false,
            }
        })

        if (res){
            return NextResponse.json({status: true})
        }
        else {
            return NextResponse.json({status: false})
        }
        }

        
    }
    catch (e) {
        return NextResponse.json({status: false})
    }
    finally {
        prisma.$disconnect();
    }
}