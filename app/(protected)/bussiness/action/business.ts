"use server"

import { prisma } from "@/lib/db/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";

type businessProps = {
    id?:string;
    busName:string;
    busEmail:string;
    busType:string;
    busAddr?:string;
    busPhone1?:string;
    busPhone2?:string;
    busTelegram?:string;
    busDes?:string;
    busInvkh?:string;
    busInvEng?:string;
    busBankName?:string;
    busBankNumber?:string;
    busBankDes?:string;
    busPayTerm?:string;
    oldImg?:string;
    oldImg1?:string;
    oldImg2?:string;
    oldImg3?:string;
    oldImg4?:string;

}

export const addBus = async ({
    busName,
    busEmail,
    busType,
    busAddr,
    busPhone1,
    busPhone2,
    busTelegram,
    busDes,
    busInvkh,
    busInvEng,
    busBankName,
    busBankNumber,
    busBankDes,
    busPayTerm
}:businessProps,data:FormData) =>{
    const file: File | null = data.get('abaQr') as unknown as File
    const file1: File | null = data.get('signature') as unknown as File
    const file2: File | null = data.get('busLogo') as unknown as File
    const file3: File | null = data.get('Rec1') as unknown as File
    const file4: File | null = data.get('Rec2') as unknown as File

    let path = ''
    let path1 = ''
    let path2 = ''
    let path3 = ''
    let path4 = ''
    
    if(!file){
        console.log("image not founded")
    }else{
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        path = join('public','business',Date.now() + file.name)
        await writeFile(path,buffer)
        
    }

    if(!file1){
        console.log("image1 not founded")
    }else{
        const byte1 = await file.arrayBuffer()
        const buffer = Buffer.from(byte1)

        path1 = join('public','business',Date.now() + file.name)
        await writeFile(path1, buffer)
    }

    if(!file2){
        console.log("image2 not founded")
    }else{
        const bytes2 = await file.arrayBuffer()
        const buffer = Buffer.from(bytes2)

        path2 = join('public','business',Date.now() + file.name)
        await writeFile(path2,buffer)
    }

    if(!file3){
        console.log("image3 not founded")
    }else{
        const bytes3 = await file.arrayBuffer()
        const buffer = Buffer.from(bytes3);

        path3 = join('public','business',Date.now() + file.name)
        await writeFile(path3 , buffer)
    }

    if(!file4){
        console.log("image4 not founded")
    }else{
        const bytes4 = await file.arrayBuffer()
        const buffer = Buffer.from(bytes4)

        path4 = join('public','business',Date.now() + file.name)
        await writeFile(path4, buffer)
    }

    if(!busName){
        return {error:"sorry business name is required!"}
    }else if (!busType){
        return {error:"sorry business type is required!"}
    }else if (!busEmail){
        return {error:"sorry email is required!"}
    }
    await prisma.business.create({
        data:{
            busName,
            busEmail,
            busType,
            busAddr,
            busPhone1,
            busPhone2,
            busTelegram,
            busDes,
            busInvkh,
            busInvEng,
            busBankName,
            busBankNumber,
            busBankDes,
            busPayTerm,
            abaQr:!file ? null : path,
            signature:!file1 ? null : path1,
            busLogo:!file2 ? null : path2,
            Rec1:!file3 ? null : path3,
            Rec2:!file4 ? null : path4
        }
    })
    return {success:"created business!"}
}


export const editBusiness = async ({
    id,
    busName,
    busEmail,
    busType,
    busAddr,
    busPhone1,
    busPhone2,
    busTelegram,
    busDes,
    busInvkh,
    busInvEng,
    busBankName,
    busBankNumber,
    busBankDes,
    busPayTerm,
    oldImg,
    oldImg1,
    oldImg2,
    oldImg3,
    oldImg4
}:businessProps,data:FormData) =>{
    const file: File | null = data.get('abaQr') as unknown as File
    const file1: File | null = data.get('signature') as unknown as File
    const file2: File | null = data.get('busLogo') as unknown as File
    const file3: File | null = data.get('Rec1') as unknown as File
    const file4: File | null = data.get('Rec2') as unknown as File

    let path = ''
    let path1 = ''
    let path2 = ''
    let path3 = ''
    let path4 = ''
    
    if(!file){
        console.log("image not founded")
    }else{
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        path = join('public','business',Date.now() + file.name)
        await writeFile(path,buffer)
        
    }

    if(!file1){
        console.log("image1 not founded")
    }else{
        const byte1 = await file.arrayBuffer()
        const buffer = Buffer.from(byte1)

        path1 = join('public','business',Date.now() + file.name)
        await writeFile(path1, buffer)
    }

    if(!file2){
        console.log("image2 not founded")
    }else{
        const bytes2 = await file.arrayBuffer()
        const buffer = Buffer.from(bytes2)

        path2 = join('public','business',Date.now() + file.name)
        await writeFile(path2,buffer)
    }

    if(!file3){
        console.log("image3 not founded")
    }else{
        const bytes3 = await file.arrayBuffer()
        const buffer = Buffer.from(bytes3);

        path3 = join('public','business',Date.now() + file.name)
        await writeFile(path3 , buffer)
    }

    if(!file4){
        console.log("image4 not founded")
    }else{
        const bytes4 = await file.arrayBuffer()
        const buffer = Buffer.from(bytes4)

        path4 = join('public','business',Date.now() + file.name)
        await writeFile(path4, buffer)
    }

    if(!id){
        return {error : "id is undefined!"}
    }else if (!busName){
        return {error:"business name is required!"}
    }else if(!busType){
        return {error:"business type is required!"}
    }else if (!busEmail){
        return {error:"business email is required!"}
    }
    await prisma.business.update({
        where:{
            id
        },
        data:{
            busName,
            busEmail,
            busType,
            busAddr,
            busPhone1,
            busPhone2,
            busTelegram,
            busDes,
            busInvkh,
            busInvEng,
            busBankName,
            busBankNumber,
            busBankDes,
            busPayTerm,
            abaQr:!file ? oldImg : path,
            signature:!file1 ? oldImg1 : path1,
            busLogo:!file2 ? oldImg2 : path2,
            Rec1:!file3 ? oldImg3 : path3,
            Rec2:!file4 ? oldImg4 : path4

        }
    })
    return {success:"updated! business"}
}

export const deleteBusiness = async (id:string) =>{
    if(!id){
        return {error:"id is undefined!"}
    }
    await prisma.business.delete({
        where:{
            id
        }
    })
    return {success:"business deleted successfully"}
}