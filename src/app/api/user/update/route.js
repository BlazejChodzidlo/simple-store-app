import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server"
import * as bcrypt from 'bcrypt'

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );

export const POST = async (req, res) => {
    try {
        // const data = await req.json()

        const { values }= await req.json()

        if (values.path === "/panel/klienci"){
            if (values.values.newPassword !== ''){
                if (values.values.password === values.values.newPassword){
                    return NextResponse.json({status: false, message: "Hasła nie mogą być takie same!"})
                }
                else {
                    if (passwordValidation.test(values.values.newPassword)){
                        const res = await prisma.user.update({
                            where: {
                                email: values.currentEmail
                            },
                            data: {
                                name: values.values.name,
                                surname: values.values.surname,
                                email: values.values.email,
                                password: bcrypt.hashSync(values.values.newPassword, bcrypt.genSaltSync(10))
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
                        email: values.currentEmail
                    },
                    data: {
                        name: values.values.name,
                        surname: values.values.surname,
                        email: values.values.email
                    }
                })

                if (res){
                    return NextResponse.json({status: true})
                }
            }
        }
        else {
            const currentUserData = await prisma.user.findUnique({
                where: {
                    email: values.currentEmail
                },
                select: {
                    password: true,
                    name: true,
                    surname: true,
                    email:true
                }
            })
    
            if (bcrypt.compareSync(values.values.password, currentUserData.password)){
                if (values.values.newPassword !== ''){
                    if (values.values.password === values.values.newPassword){
                        return NextResponse.json({status: false, message: "Hasła nie mogą być takie same!"})
                    }
                    else {
                        if (passwordValidation.test(values.values.newPassword)){
                            const res = await prisma.user.update({
                                where: {
                                    email: values.currentEmail
                                },
                                data: {
                                    name: values.values.name,
                                    surname: values.values.surname,
                                    email: values.values.email,
                                    password: bcrypt.hashSync(values.values.newPassword, bcrypt.genSaltSync(10))
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
                            email: values.currentEmail
                        },
                        data: {
                            name: values.values.name,
                            surname: values.values.surname,
                            email: values.values.email
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


    }
    catch (e) {
        return NextResponse.json({status: false})
    }
    finally {
        prisma.$disconnect();
    }
}