"use client"
import Image from 'next/image';
import React, {  useEffect, useState } from 'react'

type tableProps = {
    id:string;
    description?: string;
    sizeWidth?: number;
    sizeHeight?: number;
    quantity?: string;
    unitPrice?: string;
    m2?: number;
    total?: string;
}

type meterProps = {
    busType?:string;
    items?:tableProps[];
    abaName?:string;
    abaNumber?:string;
    invNo?:string;
    cusName?:string;
    cusComp?:string;
    cusPhone?:string;
    cusEmail?:string;
    cusAddr?:string
    invPo?:string;
    invDate?:string;
    invStatus?:string;
    partial:number;
    discount:number;
    grandTotal?:string;
    balance?:string;
    ////Toggle 
    toggleEmail?:boolean;
    toggleAddr?:boolean;
    togglePo?:boolean;
}


const Invprint = ({
    busType,
    items,
    abaName,
    abaNumber,
    invNo,
    cusName,
    cusComp,
    cusPhone,
    cusEmail,
    cusAddr,
    invPo,
    invDate,
    invStatus,
    partial,
    discount,
    grandTotal,
    balance
}:meterProps) => {

    const meters = [
        {
            label:"No.",
            class:"text-start pl-2"
        },
        {
            label:"Description",
            class:'text-start'
        },
        {
            label:"Size cm",
            class:'text-center'
        },
        {
            label:"M2",
            class:"text-center"
        },
        {
            label:"Qty",
            class:'text-center'
        },
        {
            label:"Unit Price",
            class:'text-end'
        },
        {
            label:"Total Amount",
            class:'text-end pr-2'
        }
    ]

    const generals = [
        {
            label:"No.",
            class:"text-start pl-2"
        },
        {
            label:"Description",
            class:'text-start'
        },
        {
            label:"Qty",
            class:'text-end'
        },
        {
            label:"Unit Price",
            class:'text-end'
        },
        {
            label:"Total Amount",
            class:'text-end pr-2'
        }
    ]
    
    const busInfo = [
        {
            label:"Add:",
            val:"dawdadwadada",
            clss:""
        },
        {
            label:"Email:",
            val:"dwadwadadad",
            clss:""
        },
        {
            label:"Tel:",
            val:"2131231",
            clss:""
        },
        {
            label:"Telegram",
            val:"#231313",
            clss:""
        }
    ]
    const cusInfo = [
        {
            label:"At:",
            val:cusName
        },
        {
            label:"To:",
            val:cusComp
        },
        {
            label:"Tel:",
            val:cusPhone
        },
        {
            label:"Email:",
            val:cusEmail
        },
        {
            label:"Add:",
            val:cusAddr
        },
        {
            label:"Po:",
            val:invPo
        }
    ]
    const [arr , setArr] = useState<tableProps[]>([])
    useEffect(()=>{
        setArr(items || [])
    },[items])
    const handleDragStart = (e:React.DragEvent<HTMLTableRowElement>,id:string)=>{
        e.dataTransfer.setData('text/plain',id.toString());
    }
    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
        e.preventDefault();
    };
      
    const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetId: string) => {
        e.preventDefault();
    
        // Ensure arr is not null or undefined before proceeding
        if (arr) {
            const draggedId = e.dataTransfer.getData('text/plain');
            const targetIndex = arr.findIndex((row) => row.id === targetId);
            const draggedIndex = arr.findIndex((row) => row.id === draggedId);
    
            // Ensure targetIndex and draggedIndex are valid
            if (targetIndex !== -1 && draggedIndex !== -1) {
                const updatedRows = [...arr];
                const draggedRow = updatedRows.splice(draggedIndex, 1)[0];
                updatedRows.splice(targetIndex, 0, draggedRow);
                setArr(updatedRows);
            }
        }
    };
    
  return ( 
        <div className={`bg-white py-[20px] px-[30px] w-[546px] mx-auto my-auto`}>
            <div>
                    
                    <div className='grid grid-cols-2'>
                            <div className='flex justify-start items-center col-span-1'>
                                    <Image src='/n5LOGO.png' 
                                    alt='#' 
                                    width={500} 
                                    height={500} 
                                    className='Logo w-[133px] h-auto'/>
                                {/*****************Image size w-160 h-160**************/}
                            </div>
                            <div className='text-end col-span-1'>
                                <p className='text-end text-[13px]' style={{fontFamily:"khmerContent"}}>
                                        ដឹាដាដាដាាាាាាដាដឹ
                                        ដឹាដាដាដាដាដដាដាដាដាដាដាដ
                                        ដដដដដដដដដដដដដដដដដដ
                                        ដាដាដាឹ២៣ដថថឹងឹដាចខចច
                                </p>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 py-[3px]  px-[5px]'>
                            <div className='col-span-1'>
                                <h1 className='font-bold text-[28px]'>INVOICE</h1>
                                <p className='text-[13px] font-bold'>
                                No. {invNo}
                                </p>
                            </div>
                            <p className='text-[13px] text-end font-bold flex flex-col col-span-1 justify-end'>
                                Date. {invDate}
                            </p>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className='col-span-1'>
                                {
                                    cusInfo.map((item)=>{
                                        return(
                                            <div key={item.label} className={`pl-[5px] ${!item.val ? "hidden" : "flex"}`} style={{fontFamily:"khmerContent"}}>
                                                <p className='text-[10.6px]'>{item.label}</p>
                                                <p className='text-[10px]'>{item.val}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='col-span-1 flex flex-col justify-end'>
                            <div>
                                {
                                    busInfo.map((item)=>{
                                        return(
                                            <div key={item.label} className='flex pl-[5px] justify-end' style={{fontFamily:"khmerContent"}}>
                                                <p className='text-[10.6px]'>{item.label}</p>
                                                <p className='text-[10px] text-end'>{item.val}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            </div>
                        </div>
                        <table className='w-full mt-[10px]'>
                            <thead>
                                <tr>
                                    {
                                        busType === 'meter' && (
                                            <>
                                            {
                                                meters.map((item)=>{
                                                    return(
                                                                <th key={item.label}  className={`bg-mainBlue text-white font-bold ${item.class} text-[11px]`}>{item.label} </th>
                                                    )
                                                })
                                            }
                                            </>
                                        )
                                    }
                                    {
                                        busType === 'general' && (
                                            <>
                                            {
                                                generals.map((item)=>{
                                                    return(
                                                                <th key={item.label}  className={`bg-mainBlue text-white font-bold ${item.class} text-[11px]`}>{item.label} </th>
                                                    )
                                                })
                                            }
                                            </>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    busType === 'meter' && (
                                        <>
                                        {
                                            arr?.map((item,i)=>{
                                                return(
                                                    <tr 
                                                    key={item.id} 
                                                    draggable 
                                                    onDragStart={(e)=>handleDragStart(e,item.id)}
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e)=>handleDrop(e,item.id)}
                                                    >
                                                            <td className='text-[10px] text-start pl-3 py-[2px]'>
                                                                {i+1}
                                                            </td>
                                                            <td className='text-[10px] text-start py-[2px] w-[170px]'>
                                                                {item.description}
                                                            </td>
                                                            <td className='text-[10px] py-[2px]'>
                                                                <div className='flex justify-center items-center'>
                                                                {item.sizeWidth === 0 ? "" : item.sizeWidth}
                                                                {item.sizeHeight && item.sizeWidth ? "x" : ""}
                                                                {item.sizeHeight === 0 ? "" : item.sizeHeight}
                                                              </div> 
                                                            </td>
                                                            <td className='text-[10px] text-center py-[2px]'>
                                                                {item.m2 === 0 ? "" : item.m2}
                                                            </td>
                                                            <td className='text-[10px] text-center py-[2px]'>{item.quantity !== '' ? item.quantity : ""}</td>
                                                            <td className='text-[10px] text-end py-[2px]'>{item.unitPrice} </td>
                                                            <td className='text-[10px] text-end pr-3 py-[2px]'>{item.total}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </>
                                    )
                                }
                                {
                                    busType === 'general' && (
                                        <>
                                        {
                                            arr?.map((item,i)=>{
                                                return(
                                                    <tr 
                                                    key={item.id} 
                                                    draggable 
                                                    onDragStart={(e)=>handleDragStart(e,item.id)}
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e)=>handleDrop(e,item.id)}
                                                    >
                                                            <td className='text-[10px] text-start pl-3 py-[2px]'>
                                                                {i+1}
                                                            </td>
                                                            <td className='text-[10px] text-start py-[2px] w-[170px]'>
                                                                {item.description}
                                                            </td>
                                                            <td className='text-[10px] text-end py-[2px]'>{item.quantity !== '' || item.quantity !== undefined  ? "" : item.quantity > 1 ? `${item.quantity}pcs` : `${item.quantity}pc`}</td>
                                                            <td className='text-[10px] text-end py-[2px]'>{item.unitPrice} </td>
                                                            <td className='text-[10px] text-end pr-3 py-[2px]'>{item.total}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </>
                                    )
                                }
                                {
                                    (()=>{
                                        let row = []
                                        for(let i = 12; i > (items?.length || 0); i--){
                                            row.push(
                                                <tr key={i}>
                                                    <td className='text-[10px] py-[2px]'><div className='invisible'>No</div></td>
                                                    <td className='text-[10px] py-[2px]'></td>
                                                    <td className='text-[10px] py-[2px]'></td>
                                                    <td className='text-[10px] py-[2px]'></td>
                                                    <td className='text-[10px] py-[2px]'></td>
                                                    <td className='text-[10px] py-[2px]'></td>
                                                </tr>
                                            )
                                        }
                                        return row
                                    })()
                                }
                            </tbody>
                        </table>
                        <div className='flex justify-between mt-[10px] px-[5px] pb-[4px]'>
                                <div className='flex'>
                                    <div>
                                    <Image 
                                        className='w-[50px]'
                                        width={80} 
                                        height={80} 
                                        alt='#' 
                                        src="https://bankerjobs.asia/storage/files/kh/7/thumb-816x460-8bb28995e73226227d77d1c107b05228.png"
                                    />
                                    </div>
                                                <div className='text-[10px] pl-[10px]' style={{fontFamily:"khmerContent"}}>
                                                    <p>ABA Bank Acount</p>
                                                    <p>Account: {abaNumber}</p>
                                                    <p>Name: {abaName}</p>
                                                </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                                    <div className=' col-span-1 flex items-center justify-end text-[10px] pr-[5px]' style={{fontFamily:"khmerContent"}}>
                                                    សរុប/Total
                                                    </div>
                                                    <div className={`col-span-1 font-bold text-end px-[8px] pb-[1px] ${invStatus === "partial" || invStatus === "discount" ? "" : "bg-mainBlue text-white"} text-[11px] w-[80px] h-[17px]`}>
                                                        ${grandTotal}
                                                    </div>
                                                    <div className=' col-span-1 flex items-center justify-end text-[10px] pr-[5px]' style={{fontFamily:"khmerContent"}}>
                                                    ប្រាក់កក់/Deposite
                                                    </div>
                                                    <div className={`col-span-1 font-bold text-end px-[8px] pb-[1px]  text-[11px] w-[80px] h-[17px]`}>
                                                        {isNaN(partial) || partial === parseFloat('0.00') ? '' : `$${partial.toFixed(2)}`}
                                                    </div>
                                                    {
                                                        invStatus === "discount" && (
                                                            <>
                                                            <div className=' col-span-1 flex items-center justify-end text-[10px] pr-[5px]' style={{fontFamily:"khmerContent"}}>
                                                            បញ្ចុះតម្លៃ/Discount
                                                            </div>
                                                            <div className={`${invStatus === "discount" ? "" : "hidden"} col-span-1 font-bold text-end px-[8px] pb-[1px] text-[11px] w-[80px] h-[17px]`}>
                                                                {isNaN(discount) || discount === parseFloat('0.00') ? '' : `$${discount.toFixed(2)}`}
                                                            </div>
                                                            </>
                                                        )
                                                    
                                                    
                                                    }
                                                    <div className=' col-span-1 flex items-center justify-end text-[10px] pr-[5px]' style={{fontFamily:"khmerContent"}}>
                                                    នៅខ្វះ/Balance
                                                    </div>
                                                    <div className={`col-span-1 font-bold text-end px-[8px] pb-[1px] ${invStatus === 'partial' || invStatus === 'discount' ? "bg-mainBlue text-white" : ""} text-[11px] w-[80px] h-[17px]`}>
                                                        {balance === 'NaN'|| balance ===  '0.00' ? '' : `$${balance}`}
                                                    </div>
                                
                                </div>
                        </div>
                        <div className='flex justify-between px-[5px] pt-[8px]  '>
                            <div>
                                    <Image src='/bocchi.jpg' 
                                    width={700} 
                                    height={700} 
                                    alt='#' 
                                    className='mx-auto w-[140px] h-auto'/>
                                {/*******************original size 140 x 90******************/}
                            </div>
                            <div>
                                            <div className='text-end text-[10px]' style={{fontFamily:"khmerContent"}}>
                                                <p>djawdjwakldwjaldkjakldjwakld</p>
                                                <p>wdadadadwadwadwadadwadwadwad</p>
                                                <p>dawdadadadaddadwadwadawdada</p>
                                                <p>dawdadadadadadadadwad</p>      
                                            </div> 
                                <div className='flex justify-end pt-[22px]'>
                                    <div className='text-end pr-[40px]'>
                                        <Image src='/bocchi.jpg' width={500} height={500} alt='#' className=' invisible mx-auto w-[60px] h-auto'/>
                                        {/*****************origin 50x50***************/}
                                            <p className='text-[10px] text-center' style={{fontFamily:"khmerContent"}}>ហត្ថលេខាអ្នកទិញ</p>
                                            <p className='text-[10px]'>customer signature</p>
                                    </div>
                                    <div className='text-center'>
                                            {/*****************origin 50x50***************/}
                                            <Image src='/bocchi.jpg' width={500} height={500} alt='#' className=' mx-auto w-[60px]  h-auto'/>
                                                <p className='text-[10px] text-center' style={{fontFamily:"khmerContent"}}>
                                                    ហត្ថលេខាអ្នកលក់
                                                </p>
                                                <p className='text-[10px]'>Seller Signature</p>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>

        </div>
  )
}

export default Invprint