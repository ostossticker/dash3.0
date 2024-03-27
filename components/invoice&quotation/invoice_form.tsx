"use client"
import Image from 'next/image';
import React, {  useEffect, useMemo, useState } from 'react'
import ResponsiveElement from './ResComp';

type tableProps = {
    id:string;
    description?: string;
    sizeWidth?: number;
    sizeHeight?: number;
    quantity?: string;
    unitPrice?: string | number;
    m2?: number;
    total?: string | number;
  
}

type invFormProps = {
    invStatus:string;
    discount:number;
    partial:number
    ///invoice form
    cusName?:string;
    cusComp?:string;
    items?:tableProps[];
    cusPhone?:string;
    cusEmail?:string;
    cusAddr?:string;
    invPo?:string;
    invNo?:string;
    invDate?:string;
    abaNumber?:string;
    abaName?:string;
    busDes?:string;
    //// ur infomation
    busAddr?:string;
    busEmail?:string;
    busTelegram?:string;
    busPhone?:string;
    busType?:string;
    /// grand totals
    grandTotal?:string;
    balance?:string;
    ////Toggle 
    toggleEmail?:boolean;
    toggleAddr?:boolean;
    togglePo?:boolean;
  
  }

const PrintForm = ({
    toggleAddr,
    toggleEmail,
    togglePo,
    grandTotal,
    balance,
    busType,
    items,
    discount , 
    partial,
    invPo ,
    busDes, 
    invStatus,
    abaName,
    abaNumber,
    invNo,
    invDate, 
    cusName ,
    cusComp , 
    cusPhone , 
    cusEmail , 
    cusAddr,
    busAddr,
    busEmail,
    busTelegram,
    busPhone
}:invFormProps) => {

    const generals = useMemo(()=>[
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
    ],[])
    const meters = useMemo(()=>[
        {
            label:"No.",
            class:"text-start pl-2 2xl!:text-[14px]"
        },
        {
            label:"Description",
            class:'text-start 2xl!:text-[14px]'
        },
        {
            label:"Size cm",
            class:"text-center 2xl!:text-[14px]"
        },
        {
            label:"M2",
            class:"text-center 2xl!:text-[14px]"
        },
        {
            label:"Qty",
            class:'text-center 2xl!:text-[14px]'
        },
        {
            label:"Unit Price",
            class:'text-end 2xl!:text-[14px]'
        },
        {
            label:"Total Amount",
            class:'text-end pr-2 2xl!:text-[14px]'
        }
    ],[])
    
    const busInfo = useMemo(()=>[
        {
            label:"Add:",
            val:busAddr,
            clss:""
        },
        {
            label:"Email:",
            val:busEmail,
            clss:""
        },
        {
            label:"Tel:",
            val:busPhone,
            clss:""
        },
        {
            label:"Telegram",
            val:busTelegram,
            clss:""
        }
    ],[busAddr , busEmail , busPhone , busTelegram])
    const cusInfo = useMemo(()=>[
        {
            label:"At:",
            val:cusName,
            class:""
        },
        {
            label:"To:",
            val:cusComp,
            class:""
        },
        {
            label:"Tel:",
            val:cusPhone,
            class:""
        },
        {
            label:"Email:",
            val:cusEmail,
            class:`${toggleEmail ? "hidden" : ""}`
        },
        {
            label:"Add:",
            val:cusAddr,
            class:`${toggleAddr ? "hidden" : ""}`
        },
        {
            label:"Po",
            val:invPo,
            class:`${togglePo ? "hidden" : ""}`
        }
    ],[cusName , cusComp , cusPhone , cusEmail , cusAddr , invPo])
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
      
    const handleDrop = (e:React.DragEvent<HTMLTableRowElement>,targetId:string) =>{
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
    }
  return ( 
    <>
        <ResponsiveElement width={546}  height={'auto'} px={40} py={20} className='bg-white '>
            <div>
            <div className='grid grid-cols-2'>
                            <div className='flex justify-start items-center col-span-1'>
                                <ResponsiveElement width={145} height={'auto'}>
                                    <div>
                                    <Image src='/n5LOGO.png' alt='#' width={500} height={500} className='Logo w-full h-auto'/>
                                    </div>
                                </ResponsiveElement>
                                {/*****************Image size w-160 h-160**************/}
                            </div>
                            <div className='text-end col-span-1'>
                                <ResponsiveElement leading={31} width={'auto'} height={'auto'} fontSize={9} className='text-end' style={{fontFamily:"khmerContent"}}>
                                     <p>
                                     ស្ទីកគ័រព្រីនកាត់ឡូហ្គូតាមពុម្ពអក្សរ
                                     ស្ទីកគ័រព្រីនកាត់ឡូហ្គូតាមពុម្ពអក្សរ
                                     ស្ទីកគ័រព្រីនកាត់ឡូហ្គូតាមពុម្ពអក្សរ
                                     ស្ទីកគ័រព្រីនកាត់ឡូហ្គូតាមពុម្ពអក្សរ
                                     ស្ទីកគ័រព្រីនកាត់ឡូហ្គូតាមពុម្ពអក្សរ
                                    </p>
                                </ResponsiveElement>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 py-[5px]  px-[5px]'>
                            <div className='col-span-1'>
                                <ResponsiveElement width={'auto'} height={'auto'} fontSize={20} className='font-bold'>
                                <h1 >INVOICE</h1>
                                </ResponsiveElement>
                                <ResponsiveElement width={'auto'} height={'auto'} fontSize={8} className='font-bold'>
                                    <p>No. {invNo}</p>
                                </ResponsiveElement>
                            </div>
    
                            <ResponsiveElement width={'auto'} height={'auto'} fontSize={8} className='text-end font-bold  flex flex-col col-span-1 justify-end'>
                                    <p >
                                        Date. {invDate}
                                    </p>
                            </ResponsiveElement>
    
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className='col-span-1'>
                                {
                                    cusInfo.map((item)=>{
                                        return(
                                            <div key={item.label} className={`${item.class} flex pl-[5px]`} style={{fontFamily:"khmerContent"}}>
                                                <ResponsiveElement width={'auto'} height={'auto'} fontSize={8}>
                                                    <p>{item.label}</p>
                                                </ResponsiveElement>
                                                <ResponsiveElement width={'auto'} height={'auto'} fontSize={7}>
                                                    <p>{item.val}</p>
                                                </ResponsiveElement>
                                            </div>
                                        )
                                    })
                                }
                                {toggleAddr ? "show" : "hide"}
                                {toggleEmail}
                                {togglePo}
                            </div>
                            <div className='col-span-1 flex flex-col justify-end'>
                            <div>
                                {
                                    busInfo.map((item)=>{
                                        return(
                                            <div key={item.label} className='flex pl-[5px] justify-end' style={{fontFamily:"khmerContent"}}>
                                                <ResponsiveElement width={'auto'} height={'auto'} fontSize={8}>
                                                    <p>{item.label}</p>
                                                </ResponsiveElement>
                                                <ResponsiveElement width={'auto'} height={'auto'} fontSize={7} className='text-end'>
                                                    <p>{item.val}</p>
                                                </ResponsiveElement>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            </div>
                        </div>
                        <table className='w-full mt-[3px] lg:mt-[5px] md:mt-[5px] 2xl:mt-[10px]'>
                            <thead>
                                <tr>
                                {
                                        busType === "meter" && (
                                            <>
                                            {
                                            meters.map((item)=>{
                                                    return(
                                                            <ResponsiveElement key={crypto.randomUUID()} width={'auto'} height={'auto'} fontSize={8.3} className={`bg-mainBlue text-white font-bold ${item.class}`}>
                                                                <th>{item.label} </th>
                                                            </ResponsiveElement>
                                                    )
                                                })
                                            }
                                            </>
                                        )
                                    }
                                    {
                                        busType === "general" && (
                                            <>
                                            {
                                                generals.map((item)=>{
                                                    return(
                                                            <ResponsiveElement key={crypto.randomUUID()} width={'auto'} height={'auto'} fontSize={8.3} className={`bg-mainBlue text-white font-bold ${item.class}`}>
                                                                <th>{item.label} </th>
                                                            </ResponsiveElement>
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
                                            arr.map((item,i)=>{
                                                return(
                                                    <tr 
                                                    key={item.id} 
                                                    draggable="true"
                                                    onDragStart={(e)=>handleDragStart(e,item.id)}
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e)=>handleDrop(e,item.id)}
                                                    >
                                                        <ResponsiveElement fontSize={7} width={'auto'} height={'auto'} py={1.8} className='text-start pl-3 2xl:!text-[16px]'>
                                                        <td >
                                                            {i+1}
                                                        </td>
                                                        </ResponsiveElement>
                                                        <ResponsiveElement width={150} height={'auto'} fontSize={7} py={1.8} className='text-start 2xl:!text-[16px]' style={{fontFamily:"khmerContent"}}>
                                                            <td>
                                                                {item.description}
                                                            </td>
                                                        </ResponsiveElement>
                                                        <ResponsiveElement width={'auto'} height={'auto'} fontSize={7} py={1.8} className='2xl:!text-[16px]'>
                                                            <td>
                                                                <div className='flex items-center justify-center'>
                                                                <div>{item.sizeWidth === 0 ? "" : item.sizeWidth}</div>
                                                                    <p>{item.sizeHeight && item.sizeWidth ? "x" : ""}</p>
                                                                    <div>{item.sizeHeight === 0 ? "" : item.sizeHeight}</div>
                                                                </div>
                                                            </td>
                                                        </ResponsiveElement>
                                                        <ResponsiveElement width={'auto'} height={'auto'} fontSize={7} px={5} py={1.8} className='text-center  2xl:!text-[16px]'>
                                                            <td>{item.m2 === 0 ? "" : item.m2?.toFixed(2)}</td>
                                                        </ResponsiveElement>
                                                        <ResponsiveElement width={'auto'} height={'auto'} fontSize={7} py={1.8} className='text-center  2xl:!text-[16px]'>
                                                            <td>{item.quantity === "" ? "" : item.quantity}</td>
                                                        </ResponsiveElement>
                                                    
                                                        <ResponsiveElement className='text-end  2xl:!text-[16px]' fontSize={7} py={1.8} width={'auto'} height={'auto'}>
                                                            <td>{item.unitPrice} </td>
                                                        </ResponsiveElement>
                                                        <ResponsiveElement className='text-end pr-3  2xl:!text-[16px]' fontSize={7} py={1.8} width={'auto'} height={'auto'}>
                                                            <td>{item.total}</td>
                                                        </ResponsiveElement>
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
                                            arr.map((item,i)=>{
                                                return(
                                                    <tr 
                                                    key={item.id} 
                                                    draggable="true"
                                                    onDragStart={(e)=>handleDragStart(e,item.id)}
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e)=>handleDrop(e,item.id)}
                                                    >
                                                        <ResponsiveElement fontSize={7} width={'auto'} height={'auto'} className='text-start pl-3'>
                                                        <td >
                                                            {i+1}
                                                        </td>
                                                        </ResponsiveElement>
                                                        <ResponsiveElement width={'auto'} height={'auto'} fontSize={7} className='text-start'>
                                                            <td>
                                                            {item.description}
                                                            </td>
                                                        </ResponsiveElement>
                                                        <ResponsiveElement width={'auto'} height={'auto'} fontSize={7} className='text-center'>
                                                            <td>{item.quantity === "" ? "" : item.quantity}</td>
                                                        </ResponsiveElement>
                                                    
                                                        <ResponsiveElement className='text-end' fontSize={7} width={'auto'} height={'auto'}>
                                                            <td>{item.unitPrice} </td>
                                                        </ResponsiveElement>
                                                        <ResponsiveElement className='text-end pr-3' fontSize={7} width={'auto'} height={'auto'}>
                                                            <td>{item.total}</td>
                                                        </ResponsiveElement>
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
                                        for(let i = 12; i > (items?.length || 0) ; i--){
                                            row.push(
                                                <tr key={crypto.randomUUID()}>
                                                    <ResponsiveElement width={'auto'} height={'auto'} fontSize={7} py={1.8} className='2xl:!text-[16px]'>
                                                    <td><div className='invisible'>No</div></td>
                                                    </ResponsiveElement>
                                                    <ResponsiveElement width={'auto'} height={'auto'} fontSize={7} py={1.8} className='2xl:!text-[16px]'>
                                                    <td><div className='invisible'>No</div></td>
                                                    </ResponsiveElement>
                                                    <ResponsiveElement width={'auto'} height={'auto'} fontSize={7} py={1.8} className='2xl:!text-[16px]'>
                                                    <td><div className='invisible'>No</div></td>
                                                    </ResponsiveElement>
                                                    <ResponsiveElement width={'auto'} height={'auto'} fontSize={7} py={1.8} className='2xl:!text-[16px]'>
                                                    <td><div className='invisible'>No</div></td>
                                                    </ResponsiveElement>
                                                    <ResponsiveElement width={'auto'} height={'auto'} fontSize={7} py={1.8} className='2xl:!text-[16px]'>
                                                    <td><div className='invisible'>No</div></td>
                                                    </ResponsiveElement>
                                                </tr>
                                            )
                                        }
                                        return row
                                    })()
                                }
                            </tbody>
                        </table>
                        <div className='flex justify-between mt-[3px] lg:mt-[5px] md:mt-[5px] 2xl:mt-[10px] px-[5px] '>
                                <div className='flex'>
                                    <div>
                                    <Image 
                                        className='w-[30px]  md:w-[35px] lg:w-[35px] 2xl:w-[70px]'
                                        width={80} 
                                        height={80} 
                                        alt='#' 
                                        src="https://bankerjobs.asia/storage/files/kh/7/thumb-816x460-8bb28995e73226227d77d1c107b05228.png"
                                    />
                                    </div>
                                                    
                                    <ResponsiveElement width={'auto'} height={'auto'} fontSize={8} className='pl-[10px]' style={{fontFamily:"khmerContent"}}>
                                                <div >
                                                    <p>ABA Bank Acount</p>
                                                    <p>Account: {abaNumber}</p>
                                                    <p>Name: {abaName}</p>
                                                </div>
                                    </ResponsiveElement>
                         
                                </div>
                                <div className='flex'>
                                        <ResponsiveElement fontSize={8} width={'auto'} height={'auto'} className='text-end pr-[5px]'  style={{fontFamily:"khmerContent"}}>
                                                <div>
                                                     សរុប/Total
                                                    <br />
                                                    ប្រាក់កក់/Deposite
                                                    <br />
                                                    {
                                                        invStatus === "discount" && (
                                                            <>
                                                            បញ្ចុះតម្លៃ/Discount
                                                            <br/>
                                                            </>
                                                        )
                                                    
                                                    
                                                    }
                                                    នៅខ្វះ/Balance
                                                    <br />
                                                </div>
                                        </ResponsiveElement>
                                    <div>
                                                    <ResponsiveElement width={80} height={'auto'} fontSize={7} className='font-bold text-end px-[8px] py-[1px] bg-mainBlue text-white 2xl!:text-[14px]'>
                                                        <div >
                                                        ${grandTotal}
                                                        </div>
                                                    </ResponsiveElement>
                                                    <ResponsiveElement width={80} height={'auto'} fontSize={7} className='font-bold text-end px-[8px] py-[1px] bg-mainBlue text-white 2xl!:text-[14px]'>
                                                        <div >
                                                        {isNaN(partial) || partial === parseFloat('0.00') ? '' : `$${partial.toFixed(2)}`}
                                                        </div>
                                                    </ResponsiveElement>
                                                    <ResponsiveElement width={80} height={'auto'} fontSize={7} className='font-bold text-end px-[8px] py-[1px] bg-mainBlue text-white 2xl!:text-[14px]'>
                                                        <div >
                                                        {isNaN(discount) || discount === parseFloat('0.00') ? '' : `$${discount.toFixed(2)}`}
                                                        </div>
                                                    </ResponsiveElement>
                                                    <ResponsiveElement width={80} height={'auto'} fontSize={7} className='font-bold text-end px-[8px] py-[1px] bg-mainBlue text-white 2xl!:text-[14px]'>
                                                        <div >
                                                        {balance === 'NaN'|| balance ===  '0.00' ? '' : `$${balance}`}
                                                        </div>
                                                    </ResponsiveElement>
                                        <div className='invisible'>#</div>
                                    </div>
                                </div>
                        </div>
                        <div className='flex justify-between px-[5px] pt-[3px] 2xl:pt-[10px] lg:pt-[5px] md:pt-[5px] '>
                            <ResponsiveElement width={100} height={'auto'} >
                            <div>
                            <Image src='/bocchi.jpg' 
                                    width={500} 
                                    height={500} 
                                    alt='#' 
                                    className='w-full h-auto'/>
                            </div>
                            </ResponsiveElement>
                            <div>
                                    <ResponsiveElement className='text-end' width={'auto'} height={'auto'} fontSize={7} style={{fontFamily:"khmerContent"}}>
                                            <div>
                                                <p>djawdjwakldwjaldkjakldjwakld</p>
                                                <p>wdadadadwadwadwadadwadwadwad</p>
                                                <p>dawdadadadaddadwadwadawdada</p>
                                                <p>dawdadadadadadadadwad</p>      
                                            </div> 
                                    </ResponsiveElement>
                                <div className='flex justify-end pt-[22px]'>
                                    <div className='text-end pr-[40px]'>
                                        <Image src='/bocchi.jpg' width={500} height={500} alt='#' className='w-[30px] invisible mx-auto 2xl:w-[60px] lg:w-[40px] md:w-[40px] h-auto'/>
                                        {/*****************origin 50x50***************/}
                                        <ResponsiveElement width={'auto'} height={'auto'} fontSize={8} className='text-center' style={{fontFamily:"khmerContent"}}>
                                            <p>ហត្ថលេខាអ្នកទិញ</p>
                                        </ResponsiveElement>
                                        <ResponsiveElement fontSize={8} width={'auto'} height={'auto'} >
                                            <p>customer signature</p>
                                        </ResponsiveElement>
                                    </div>
                                    <div className='text-center'>
                                            {/*****************origin 50x50***************/}
                                            <Image src='/bocchi.jpg' width={500} height={500} alt='#' className='w-[30px] mx-auto 2xl:w-[60px] lg:w-[40px] md:w-[40px] h-auto'/>
                                            <ResponsiveElement width={'auto'} height={'auto'} fontSize={8} className='text-center' style={{fontFamily:"khmerContent"}}>
                                                <p >ហត្ថលេខាអ្នកលក់</p>
                                            </ResponsiveElement>
                                            <ResponsiveElement width={'auto'} height={'auto'} fontSize={8}>
                                                <p >Seller Signature</p>
                                            </ResponsiveElement>
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
    
            </div>
        </ResponsiveElement>
        </>
  )
}

export default PrintForm