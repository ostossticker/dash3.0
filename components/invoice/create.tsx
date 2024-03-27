"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Top from '../invoice&quotation/top'
import Middle from '../invoice&quotation/middle'
import Meter from '../invoice&quotation/meter'
import useToggle from '@/hooks/stores'
import axios from 'axios'
import { useCurrentUser } from '@/hooks/use-current-user'
import General from '../invoice&quotation/general'
import { url } from '@/lib/url'

type cusType = {
    cusName:string;
    cusComp:string;
    cusPhone:string;
    cusEmail:string;
    cusAddr:string;
    invBus:string;
    invNo:string;
    invPo:string;
    invTitle:string;
    invDate:string;
    invStatus:string;
    invStaff:string;
}

type optionDrop = {
    id?:string;
    busName?:string;
    busType?:string;
    busBankName?:string;
    busBankNumber?:string
}

type cusDrop = {
    cusName?:string;
    cusPhone1?:string;
    cusEmail?:string;
    cusAddr?:string;
    cusComp?:string;
}

type empProps = {
    empName?:string;
}

const Createinv = () => {
    const {darkMode} = useToggle()
    const [focus , setFocus] = useState<number | null>(null)
    const [focus1 , setFocus1] = useState<number | null>(null)
    const [focus2 , setFoucs2] = useState<number | null>(null)
    const [focus3 , setFocus3] = useState<number | null>(null)
    const [test , setTest] = useState<optionDrop[]>([])
    const [suggest , setSuggest] = useState<optionDrop[]>([])
    const [test1 ,  setTest1] = useState<cusDrop[]>([])
    const [test2 , setTest2] = useState<cusDrop[]>([])
    const [test3 , setTest3] = useState<empProps[]>([])
    const [suggest1 , setSuggest1] = useState<cusDrop[]>([])
    const [suggest2 , setSuggest2] = useState<cusDrop[]>([])
    const [suggest3 , setSuggest3] = useState<empProps[]>([])
    const [aba , setAba] = useState<optionDrop>({
      busBankName:"",
      busBankNumber:""  
    })
    const [emp , setEmp] = useState<string[]>([])
    const [staff , setStaff] = useState<string>('')
    const [partial , setPartial] = useState<string>('')
    const [discount , setDiscount] = useState<string>('')
    const user = useCurrentUser()
    const [toggle , setToggle] = useState({
        cusEmail:false ,
        cusAddr:false,
        invPo:false
    })
    const [val , setVal] = useState<cusType>({
        cusName:'',
        cusComp:'',
        cusPhone:'',
        cusEmail:'',
        cusAddr:'',
        invBus:'',
        invNo:'',
        invStatus:'',
        invStaff:'',
        invPo:'',
        invTitle:'',
        invDate:new Date().toISOString().split('T')[0]
    })

    useEffect(()=>{
        const fetchdata1 = async () =>{
            const {data} = await axios.get(`${url}/api/customerss?email=${user.email}&filter=${val.cusName}`)
            setTest1(data)
        }
        const fetchdata = async() =>{
            const {data} = await axios.get(`${url}/api/businesss?email=${user.email}&filter=${val.invBus}`)
            setTest(data)
        }
        const fetchdata2 = async () =>{
            
        }
        const fetchData3 = async () =>{
            const {data} = await axios.get(`${url}/api/employees?email=${user.email}&filter=${staff}`)
            setTest3(data)
        }
        fetchdata()
        fetchdata1()
        fetchData3()
    },[user.email,val.invBus,val.cusName])

    const cusForm = useMemo(()=>[
        {
            label:'Name',
            name:'cusName',
            val:val.cusName,
            func:()=>{}
        },
        {
            label:"Company",
            name:'cusComp',
            val:val.cusComp,
            func:()=>{}
        },
        {
            label:"Phone",
            name:'cusPhone',
            val:val.cusPhone,
            func:()=>{}
        },
        {
            label:"Email",
            name:'cusEmail',
            val:val.cusEmail,
            func:()=>setToggle({...toggle, cusEmail:!toggle.cusEmail})
        },
        {
            label:"Address",
            name:'cusAddr',
            val:val.cusAddr,
            func:()=>setToggle({...toggle, cusAddr:!toggle.cusAddr})
        }
    ],[val.cusName , val.cusComp , val.cusPhone , val.cusEmail , val.cusAddr])
    const invForm = useMemo(()=>[
        {
            label:'No#',
            name:'invNo',
            type:'text',
            val:val.invNo,
            func:()=>{}
        },
        {
            label:"Po",
            name:'invPo',
            type:'text',
            val:val.invPo,
            func:()=>setToggle({...toggle , invPo:!toggle.invPo})
        },
        {
            label:"Title",
            name:'invTitle',
            type:'text',
            val:val.invTitle,
            func:()=>{}
        },
        {
            label:"Business",
            name:'invBus',
            type:'',
            val:val.invBus,
            func:()=>{}
        },
        {
            label:"Status",
            name:'invStatus',
            type:'select',
            val:val.invStatus,
            func:()=>{}
        },
        {
            label:"Date",
            name:'invDate',
            type:'date',
            val:val.invDate,
            func:()=>{}
        },
        {
            label:"Staff",
            name:'invStaff',
            type:'array',
            val:val.invStaff,
            func:()=>{}
        },
    ],[val.invNo , val.invPo , val.invTitle , val.invBus , val.invStatus , val.invDate , val.invStaff])
    const handleChangeVal = (
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        const { name, value } = e.target;
      
        if (setSuggest) {
          if (name === 'invBus') {
            const filteredOptions = test?.filter(
              (op) => op.busName?.toLowerCase().includes(value.toLowerCase())
            );
            setSuggest(filteredOptions);
          }
        }
        if(setSuggest1){
            if(name === 'cusName'){
                const filteredOptions = test1.filter(
                    (op) => op.cusName?.toLowerCase().includes(value.toLowerCase())
                )
                setSuggest1(filteredOptions)
            }
        }
        if(setSuggest2){
            if(name === 'cusPhone'){
                const filteredOptions = test1.filter(
                    (op) => op.cusPhone1?.toLowerCase().includes(value.toLowerCase())
                )
                setSuggest2(filteredOptions)
            }
        }
        
      
        setVal({
          ...val,
          [name]: value,
        });
      };

    const handleFilterBus = (op:optionDrop) =>{
        setVal({
            ...val,
            invBus:op.busName || ''
        })
        setAba({
            busBankName:op.busBankName,
            busBankNumber:op.busBankNumber
        })
    }
    const handleFilterStaff = (op:empProps) =>{
        setStaff(op.empName || '')
    }
    const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const {name , value} = e.target
        setVal({
            ...val,
            [name]:value
        })
        const parsedPartial = parseFloat(partial);
        const parsedDiscount = parseFloat(discount);

        if (!isNaN(parsedPartial)) {
            setPartial(formatValueWithDollarSign(parsedPartial));
        }
        if (!isNaN(parsedDiscount)) {
            setDiscount(formatValueWithDollarSign(parsedDiscount));
        }
    }
    const handleFilterCus = (op:cusDrop) =>{
        const { cusName = '', cusAddr = '', cusComp = '', cusEmail = '', cusPhone1 = '' } = op;
        setVal(prevVal => ({
            ...prevVal,
            cusName,
            cusAddr,
            cusComp,
            cusEmail,
            cusPhone: cusPhone1
        }));
    }
    const handleFilterCus1 = (op:cusDrop) =>{
        const { cusName = '', cusAddr = '', cusComp = '', cusEmail = '', cusPhone1 = '' } = op;
        setVal(prevVal => ({
            ...prevVal,
            cusName,
            cusAddr,
            cusComp,
            cusEmail,
            cusPhone: cusPhone1
        }));
    }

    const handleBlur = (index:number) =>{
        setFocus(null)
      }
      const handleBlur1 = () =>{
        setFocus1(null)
      }
      const handleBlur2 = () =>{
        setFoucs2(null)
      }
      const handleBlur3 = () =>{
        setFocus3(null)
      }
      const handleFocus = (index:number) =>{
        setFocus(index)
      }
      const handleFocus1 = (index:number) =>{
        setFocus1(index)
      }
      const handleFocus2 = (index:number) =>{
        setFoucs2(index)
      }
      const handleFocus3 = (index:number)=>{
        setFocus3(index)
      }


      const formatValueWithDollarSign = (value: number): string => {
        return `$${value.toFixed(2)}`;
      };
      
      const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const valueWithoutDollarSign = value.replace(/\$/g, '');
        setDiscount(isNaN(parseFloat(valueWithoutDollarSign)) ? '0' : valueWithoutDollarSign);
      };
      
      const handlePartialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const valueWithoutDollarSign = value.replace(/\$/g, '');
        setPartial(isNaN(parseFloat(valueWithoutDollarSign)) ? '0' : valueWithoutDollarSign);
      };
      
      const handleDiscountBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value.replace(/\$/g, ''));
        const formattedValue = isNaN(value) ? '' : formatValueWithDollarSign(value);
        setDiscount(formattedValue)
      };
      
      const handlePartialBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value.replace(/\$/g, ''));
        const formattedValue = isNaN(value) ? '' : formatValueWithDollarSign(value);
        setPartial(formattedValue);
      };
      
      const handleStaffChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value
        setStaff(value)
        if(setSuggest3){
                const filteredOptions = test3.filter(
                    (op) => op.empName?.toLowerCase().includes(value.toLowerCase())
                )
                setSuggest3(filteredOptions)
            
        }
      }

      const handleStaffKey = (e:React.KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === 'Enter' && staff.trim() !== ''){
            e.preventDefault();
            addStaff(staff)
            setStaff('')
        }
      }

      const addStaff = (staffName:string) =>{
        const updateName = [...emp , staffName];
        setEmp(updateName)
      }

      const removeStaff = (index:number) =>{
        const updateName = [...emp];
        updateName.splice(index , 1);
        setEmp(updateName);
      }

  return (
    <>
    <Top text='Invoice' topTitle='.Customer Info'>
        <div className={`grid grid-cols-5 gap-3 `}>
        {
            cusForm.map((item,index)=>{
                return(
                    <div key={item.name} className="col-span-1 relative border-[1px] border-insomnia-primary rounded-md ">
                        {
                            item.label !== "Name" && item.label !== "Phone" ? (
                                <input
                                    type="text" 
                                    className={`block pl-2 p-1 w-full text-md appearance-none focus:outline-none bg-transparent ${darkMode ? "text-dark-lg-color" : ""}`}
                                    placeholder=" "
                                    required
                                    name={item.name}
                                    value={item.val}
                                    onChange={handleChangeVal}
                                />
                            ) : (
                                <>
                                {
                                   item.label === "Name" && (
                                    <>
                                    <input 
                                    type="text" 
                                    className={`block pl-2 p-1 w-full text-md appearance-none focus:outline-none bg-transparent ${darkMode ? "text-dark-lg-color" : ""}`}
                                    placeholder=''
                                    required
                                    name={item.name}
                                    value={item.val}
                                    onChange={handleChangeVal}
                                    onClick={()=>handleFocus1(index + 1)}
                                    />
                                    <div className='relative'>
                                        {
                                            focus1 && (
                                                <ul className='absolute z-50 rounded-md border-[1px] shadow-md bg-white pl-2  py-1 w-full mt-2'>
                                                    {
                                                        suggest1.map((item)=>{
                                                            return(
                                                                <li key={item.cusName} className='cursor-pointer' onClick={()=>{
                                                                    handleBlur1()
                                                                    handleFilterCus(item)
                                                                }}>{item.cusName}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            )
                                        }
                                    </div>
                                    </>
                                   ) 
                                }
                                {
                                    item.label === "Phone" && (
                                        <>
                                        <input
                                        type="text" 
                                        className={`block pl-2 p-1 w-full text-md appearance-none focus:outline-none bg-transparent ${darkMode ? "text-dark-lg-color" : ""}`}
                                        placeholder=''
                                        required
                                        name={item.name}
                                        value={item.val}
                                        onChange={handleChangeVal}
                                        onClick={()=>handleFocus2(index)}
                                        />
                                        <div className='relative'>
                                        {
                                            focus2 && (
                                                <ul className='absolute z-50 rounded-md border-[1px] shadow-md bg-white pl-2  py-1 w-full mt-2'>
                                                    {
                                                        suggest2.map((item)=>{
                                                            return(
                                                                <li key={item.cusPhone1} className='cursor-pointer' onClick={()=>{
                                                                    handleBlur2()
                                                                    handleFilterCus1(item)
                                                                }}>{item.cusPhone1}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            )
                                        }
                                        </div>
                                        </>
                                    )
                                }
                                
                                </>
                            )
                        }
                        <label  className={`absolute top-0 text-md ${darkMode ? "bg-dark-box-color" : "bg-white"} p-4 -z-1 transform text-insomnia-primary scale-75 -translate-y-4 z-0 px-1 py-0 duration-300 origin-0`}
                        onClick={item.func}>
                                {item.label}
                            </label>
                    </div>
                )
            })
        }
        </div>
    </Top>
    <Middle middleTitle='.Invoice Info'>
        <div className={`grid ${val.invStatus === "partial" || val.invStatus === "discount" ? "grid-cols-8" : "grid-cols-7"} gap-3`}>
            {
                invForm.map((item,index)=>{
                    return(
                        <React.Fragment key={item.name}>
                            <div className='col-span-1 relative border-[1px] border-insomnia-primary rounded-md '>
                           {
                            item.label !== "Business" && item.label !== "Status" && item.label !== "Staff"  ? (
                                <input
                                type={item.type} 
                                className={`block pl-2 p-1 w-full text-md appearance-none focus:outline-none bg-transparent ${darkMode ? "text-dark-lg-color" : ""}`}
                                placeholder=" "
                                required
                                name={item.name}
                                value={item.val}
                                onChange={handleChangeVal}
                                
                            />
                            ) : item.type === "select" ? (
                                <>
                                <select className={`block pl-2 p-1 w-full text-md appearance-none focus:outline-none bg-transparent ${darkMode ? "text-dark-lg-color" : ""}`}
                                    name={item.name}
                                    value={item.val}
                                    onChange={handleSelectChange}
                                >
                                    <option className='text-dark-box-color' value="paid">Paid</option>
                                    <option className='text-dark-box-color' value="unpaid">Unpaid</option>
                                    <option className='text-dark-box-color' value="partial">Partial</option>
                                    <option className='text-dark-box-color' value="discount">Discount</option>
                                </select>
                                </>
                            ): item.type === "array" ? (
                                <>
                                <div className='block pl-2 p-1 w-full text-md focus:outline-none '>
                                   <div className={`flex overflow-y-hidden overflow-x-auto scrollbar-thin 
                                    ${darkMode ? "scrollbar-track-dark-box-color scrollbar-thumb-dark-sm-color" : "scrollbar-track-white scrollbar-thumb-slate-100"}`} >
                                    {
                                        emp.map((item,iruka)=>{
                                            return(
                                                <div className='flex bg-white mx-[2px] rounded-md px-[2px] gap-1 ' key={crypto.randomUUID()}>
                                                    <p>{item}</p>
                                                    <button className='text-red-500' onClick={()=>removeStaff(iruka)}>x</button>
                                                </div>
                                            )
                                        })
                                    }
                                   <input type="text" className={`${darkMode ? "text-dark-lg-color" : ""} outline-none bg-transparent`} value={staff} onChange={handleStaffChange} onKeyDown={handleStaffKey} onClick={()=>handleFocus3(index)}/>
                                   
                                   </div>
                                </div>
                                <div className='relative'>
                                {
                                    focus3 && (
                                        <ul className='absolute z-50 rounded-md border-[1px] shadow-md bg-white pl-2  py-1 w-full mt-2'>
                                      
                                                    {
                                                        suggest3.map((item)=>{
                                                            return (
                                                                <li key={crypto.randomUUID()} className='cursor-pointer' onClick={()=>{
                                                                    handleBlur3()
                                                                    handleFilterStaff(item)
                                                                }}>{item.empName}</li>
                                                            )
                                                        })

                                                    }
                                               
                                        </ul>
                                    )
                                }
                            </div>
                                </>
                            ) : (
                                <>
                                <input 
                                type="text" 
                                className={`block pl-2 p-1 w-full text-md appearance-none focus:outline-none bg-transparent ${darkMode ? "text-dark-lg-color" : ""}`}
                                placeholder=''
                                required
                                list='business'
                                name={item.name}
                                value={item.val}
                                onChange={handleChangeVal}
                                onClick={()=>handleFocus(index)}
                                />
                                <div className='relative'>
                                    {
                                        focus && (
                                            <ul className='absolute z-50 rounded-md border-[1px] shadow-md bg-white pl-2  py-1 w-full mt-2'>
                                          
                                                        {
                                                            suggest.map((item)=>{
                                                                return (
                                                                    <li key={item.busName} className='cursor-pointer' onClick={()=>{
                                                                        handleBlur(index)
                                                                        handleFilterBus(item)
                                                                    }}>{item.busName}</li>
                                                                )
                                                            })

                                                        }
                                                   
                                            </ul>
                                        )
                                    }
                                </div>
                                </>
                            )
                           }
                             <label className={`absolute top-0 text-md ${darkMode ? "bg-dark-box-color" : "bg-white"} p-4 -z-1 transform text-insomnia-primary scale-75 -translate-y-4 z-0 px-1 py-0 duration-300 origin-0`}
                             onClick={item.func}>
                                {item.label}
                            </label>
                        </div>
                        {
                            item.val === "partial" && (
                            <div className="col-span-1 relative border-[1px] border-insomnia-primary rounded-md ">
                                <input 
                                type="text" className={`block pl-2 p-1 w-full text-md appearance-none focus:outline-none bg-transparent ${darkMode ? "text-dark-lg-color" : ""}`}
                                value={partial}
                                onChange={handlePartialChange}
                                onBlur={handlePartialBlur}
                                />
                            <label className={`absolute top-0 text-md ${darkMode ? "bg-dark-box-color" : "bg-white"} p-4 -z-1 transform text-insomnia-primary scale-75 -translate-y-4 z-0 px-1 py-0 duration-300 origin-0`}>
                                   Partial
                                </label>
                            </div>
                            )
                        }
                        {
                            item.val === "discount" && (
                                <div className="col-span-1 relative border-[1px] border-insomnia-primary rounded-md ">
                                    <input 
                                    type="text" className={`block pl-2 p-1 w-full text-md appearance-none focus:outline-none bg-transparent ${darkMode ? "text-dark-lg-color" : ""}`}
                                    value={discount}
                                    onChange={handleDiscountChange}
                                    onBlur={handleDiscountBlur}
                                    />
                                    <label className={`absolute top-0 text-md ${darkMode ? "bg-dark-box-color" : "bg-white"} p-4 -z-1 transform text-insomnia-primary scale-75 -translate-y-4 z-0 px-1 py-0 duration-300 origin-0`}>
                                        Discount
                                    </label>
                                </div>
                            )
                        }
                        
                        </React.Fragment>
                        
                    )
                })
            }
        </div>
    </Middle>
    {
        suggest.map((item)=>{
            return(
                <React.Fragment key={item.busName}>
                    {
                        val.invBus === item.busName && (
                            <>
                            <General 
                            toggleAddr={toggle.cusAddr}
                            toggleEmail={toggle.cusEmail}
                            togglePo={toggle.invPo}
                            invStatus={val.invStatus} 
                            partial={parseFloat(partial.replace(/\$/g, ''))} 
                            discount={parseFloat(discount.replace(/\$/g, ''))} 
                            cusName={val.cusName} 
                            cusComp={val.cusComp} 
                            cusPhone={val.cusPhone} 
                            cusEmail={val.cusEmail} 
                            cusAddr={val.cusAddr} 
                            invBus={val.invBus} 
                            invNo={val.invNo} 
                            invPo={val.invPo} 
                            invTitle={val.invTitle} 
                            invDate={val.invDate} 
                            busType={item.busType}
                            abaName={aba.busBankName}
                            abaNumber={aba.busBankNumber}
                            />
                            <Meter 
                            toggleAddr={toggle.cusAddr}
                            toggleEmail={toggle.cusEmail}
                            togglePo={toggle.invPo}
                            invStatus={val.invStatus} 
                            partial={parseFloat(partial.replace(/\$/g, ''))} 
                            discount={parseFloat(discount.replace(/\$/g, ''))} 
                            cusName={val.cusName} 
                            cusComp={val.cusComp} 
                            cusPhone={val.cusPhone} 
                            cusEmail={val.cusEmail} 
                            cusAddr={val.cusAddr} 
                            invBus={val.invBus} 
                            invNo={val.invNo} 
                            invPo={val.invPo} 
                            invTitle={val.invTitle} 
                            invDate={val.invDate} 
                            busType={item.busType}
                            abaName={aba.busBankName}
                            abaNumber={aba.busBankNumber}
                            />
                            
                            
                            </>
                        )
                    }
                </React.Fragment>
            )
        })
    }
   
    </>
  )
}

export default Createinv