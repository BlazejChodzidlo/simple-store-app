import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server"
import * as bcrypt from 'bcrypt'

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );

export const POST = async (req, res) => {
    try {
        const data = await req.json()

        const currentUserData = await prisma.user.findUnique({
            where: {
                email: data.currentEmail
            },
            select: {
                password: true,
                name: true,
                surname: true,
                email:true
            }
        })

        if (bcrypt.compareSync(data.values.password, currentUserData.password)){
            if (data.values.newPassword !== ''){
                if (data.values.password === data.values.newPassword){
                    return NextResponse.json({status: false, message: "Hasła nie mogą być takie same!"})
                }
                else {
                    if (passwordValidation.test(data.values.newPassword)){
                        const res = await prisma.user.update({
                            where: {
                                email: data.currentEmail
                            },
                            data: {
                                name: data.values.name,
                                surname: data.values.surname,
                                email: data.values.email,
                                password: bcrypt.hashSync(data.values.newPassword, bcrypt.genSaltSync(10))
                            }
                        })
        
                        if (res){
                            return NextResponse.json({status: true})
                        }
                    }
                    else {
                        return NextResponse.json({status: false, message: "Hasło powinno składać się z 8 znaków, w tym duza litera, znak specjalny oraz liczba."})
                    }
                }
            }
            else {
                const res = await prisma.user.update({
                    where: {
                        email: data.currentEmail
                    },
                    data: {
                        name: data.values.name,
                        surname: data.values.surname,
                        email: data.values.email
                    }
                })

                if (res){
                    return NextResponse.json({status: true})
                }
            }
        }
        else {
            return NextResponse.json({status: false, message: "Nieprawidłowe hasło!"})
        }
    }
    catch (e) {
        return NextResponse.json({status: false})
    }
    finally {
        prisma.$disconnect();
    }
}