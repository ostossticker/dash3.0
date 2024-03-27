"use server"

import { prisma } from "@/lib/db/prisma";
import { writeFile } from "fs/promises";
import path, { join } from "path";

type purchaseProps = {
    id?:string;
    purName:string;
    purPrice:string;
    purBus:string;
    purSince:string;
    purDes?:string;
    purInvN:string;
    purSupp?:string;
    oldImg?:string;
    oldImg1?:string;
}

export const addPurchase = async ({
    purName,
    purPrice,
    purBus,
    purSince,
    purDes,
    purInvN,
    purSupp,
}:purchaseProps,data:FormData) =>{
    const file: File | null = data.get('image') as unknown as File
    const file1: File | null = data.get('image1') as unknown as File
    let path = '';
    let paths = '';

        if (!file) {
            console.log('image:notfounded')
        }else{
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
      
          // With the file data in the buffer, you can do whatever you want with it.
          // For this, we'll just write it to the filesystem in a new location
           path = join('public', 'temp', Date.now() + file.name)
          await writeFile(path, buffer)
          console.log(`open ${path} to see the uploaded file`)
        }
      if (!file1) {
          console.log('image1:notfounded')
      }else{
          const bytess = await file1.arrayBuffer()
          const buffers = Buffer.from(bytess)
      
          // With the file data in the buffer, you can do whatever you want with it.
          // For this, we'll just write it to the filesystem in a new location
          paths = join('public', 'temp', Date.now() + file1.name)
          await writeFile(paths, buffers)
          console.log(`open ${paths} to see the uploaded file`)
      }

    if(!purName){
        return {error: "seem like u forgot to name ur item name"}
    }else if (!purPrice){
        return {error:"seem like u forgot to giving a price to an item"}
    }else{
    await prisma.purchase.create({
        data:{
            purName,
            purPrice:parseFloat(purPrice.replace(/\$/g, '')),
            purBus,
            purSince,
            purDes,
            purInvN,
            purSupp,
            image1:!file ? null : path,
            image2:!file1 ? null : paths
        }
    })
    return {success:"purchase created!"}
    }
}

export const deletePurchase = async(id:string)=>{
    if(!id){
        return {error:"please refresh the page again"}
    }
    await prisma.purchase.delete({
        where:{
            id
        }
    })
    return {success:"purchase row delete success!"}
}

export const editPurchase = async ({
    id,
    purName,
    purPrice,
    purBus,
    purSince,
    purDes,
    purInvN,
    purSupp,
    oldImg1,
    oldImg
}:purchaseProps,data:FormData)=>{
    const file: File | null = data.get('image') as unknown as File
    const file1: File | null = data.get('image1') as unknown as File
    let path = '';
    let paths = '';

        if (!file) {
            console.log('image:notfounded')
        }else{
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
      
          // With the file data in the buffer, you can do whatever you want with it.
          // For this, we'll just write it to the filesystem in a new location
           path = join('public', 'temp', Date.now() + file.name)
          await writeFile(path, buffer)
          console.log(`open ${path} to see the uploaded file`)
        }
      if (!file1) {
          console.log('image1:notfounded')
      }else{
          const bytess = await file1.arrayBuffer()
          const buffers = Buffer.from(bytess)
      
          // With the file data in the buffer, you can do whatever you want with it.
          // For this, we'll just write it to the filesystem in a new location
          paths = join('public', 'temp', Date.now() + file1.name)
          await writeFile(paths, buffers)
          console.log(`open ${paths} to see the uploaded file`)
      }
    if(!id){
        return {error:"please refresh the page again"}
    }else if(!purName){
        return {error: "seem like u forgot to name ur item name"}
    }else if (!purPrice){
        return {error:"seem like u forgot to giving a price to an item"}
    }else{
    await prisma.purchase.update({
        where:{
            id
        },
        data:{
            purName,
            purPrice:parseFloat(purPrice.replace(/\$/g, '')),
            purBus,
            purSince,
            purDes,
            purInvN,
            purSupp,
            image1:!file ? oldImg : path,
            image2:!file1 ? oldImg1 : paths
        }
    })
    return {success:"purchase row delete success!"}
    }
}