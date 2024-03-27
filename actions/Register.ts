"use server"

import { getUserByEmail } from "@/fetch/user"
import { prisma } from "@/lib/db/prisma"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationtoken } from "@/lib/token"


export async function RegisterFunc (
    username:string, 
    email:string , 
    password:string , 
    cpassword:string,
    ){
    if(!username || !email || !password || !cpassword || password !== cpassword || password.length < 6  || cpassword.length < 6){
        throw Error("all field required!")
    }
    try{
        const existingUser = await getUserByEmail(email)
        if(existingUser){
            return { error:"Email already exist!" }
        }

         await prisma.user.create({
            data:{
                name:username,
                email,
                password
            }
        })

        const verificationToken = await generateVerificationtoken(email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )
        return {success:"Confirmation email send!"};
    }catch{
        return null
    }

}