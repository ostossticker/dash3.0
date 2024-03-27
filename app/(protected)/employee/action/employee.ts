"use server"

import { prisma } from "@/lib/db/prisma"
import { writeFile } from "fs/promises";
import path, { join } from "path";

type employeeProps = {
    id?:string
    empName:string;
    empId?:string;
    empPhone:string;
    empNational?:string;
    empAssc?:string;
    empAddr?:string;
    empTelegram?:string;
    empGender:string;
    empOcc?:string;
    memberSince?:string; /** this must be a time function */
    oldImg?:string;
}

export const addEmployee = async({
    empName,
    empId,
    empPhone,
    empNational,
    empAssc,
    empAddr,
    empTelegram,
    empGender,
    empOcc,
    memberSince
}:employeeProps,data:FormData) =>{
    const file:File | null = data.get('image') as unknown as File
    let path =''
    if(!file){
        console.log('image:notfounded')
    }else{
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        path = join('public', 'idcard', Date.now() + file.name)
        await writeFile(path, buffer)
        console.log(`open ${path} to see the uploaded file`)
    }
    if(!empName){
        return {error:"employee must have a name given"}
    }else if(!empPhone){
        return {error:"employee must have a phone number given"}
    }else{
        await prisma.emp.create({
            data:{
                empName,
                empId,
                empPhone,
                empNational,
                empAssc,
                empAddr,
                empCard:!file ? null : path,
                empTelegram,
                empGender,
                empOcc,
                memberSince
            }
        })
        return {success:"employee has been inserted!"} 
    }
    
}

export const deleteEmployee = async (id:string) =>{
    if(!id){
        return {error:"please refresh the page or try it again"}
    }
    await prisma.emp.delete({
        where:{
            id
        }
    })
    return {success:"employee row has been deleted!"}
}

export const editEmployee =async ({
    id,
    empName,
    empId,
    empPhone,
    empNational,
    empAssc,
    empAddr,
    empTelegram,
    empGender,
    empOcc,
    memberSince,
    oldImg
}:employeeProps,data:FormData)=>{
    const file:File | null = data.get('image') as unknown as File
    let path =''
    if(!file){
        console.log('image:notfounded')
    }else{
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        path = join('public', 'idcard', Date.now() + file.name)
        await writeFile(path, buffer)
        console.log(`open ${path} to see the uploaded file`)
    }
    if(!id){
        return {error:"please refresh the page or try it again"}
    }else if(!empName){
        return {error:"employee must have a name given"}
    }else if(!empPhone){
        return {error:"employee must have a phone number given"}
    }else{
        await prisma.emp.update({
            where:{
                id
            },
            data:{
                empName,
                empId,
                empPhone,
                empNational,
                empAssc,
                empAddr,
                empCard:!file ? oldImg : path,
                empTelegram,
                empGender,
                empOcc,
                memberSince
            }
        })
        return {success:"employee has been updated!"}
    }
   
}