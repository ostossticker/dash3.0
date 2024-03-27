import { prisma } from "@/lib/db/prisma";

type arr  = {
    id?:string;
    description: string;
    sizeWidth: number;
    sizeHeight: number;
    quantity: string;
    unitPrice: string;
    m2: number;
    total: string;
}

type invoiceProps = {
 id?:string;
 cusName:string;
 cusComp?:string;
 cusPhone?:string;
 cusEmail?:string;
 cusAddr?:string;
 invNo?:string;
 invPo?:string;
 invBus?:string;
 invTitle?:string;
 invDate?:string;
 item?:arr[];
 partial?:string;
 discount?:string;
 total?:number;
 balance?:number;
}

export const addMeter = async ({
    cusName,
    cusComp,
    cusPhone,
    cusEmail,
    cusAddr,
    invNo,
    invPo,
    invBus,
    invTitle,
    invDate,
    item,
    partial,
    discount,
    total,
    balance
}:invoiceProps) =>{
    if(!cusName){
        return {error:"customer name is required!"}
    }
    return {saving:item}
}