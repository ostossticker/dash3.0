"use client"
import useToggle from '@/hooks/stores';
import React, { useMemo, useState } from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri';

type prodTopProps = {
  val?:string;
  func?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  val1?:string;
  func1?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  val2?:string;
  func2?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  val3?:string;
  func3?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  suggesting:Options[];
  setFilter:React.Dispatch<React.SetStateAction<string>>;
  setGender:React.Dispatch<React.SetStateAction<string>>;
  setOcc:React.Dispatch<React.SetStateAction<string>>;
  onclick?:()=>void;
}


type Options = {
    id:string;
    empName:string;
    empGender:string;
    empOcc:string;
}

const EmpTop = ({val,func,val1,func1,val2,func2,val3,func3,onclick,suggesting,setFilter,setGender,setOcc}:prodTopProps) => {
   const {darkMode} = useToggle()
   const [focus , setFocus] = useState<number | null>(null)

   const inputsFilter = useMemo(()=>[
    {
        label:"FILTER",
        placeholder:"Search...",
        type:"text",
        typeSelect:"",
        val:val,
        func:func,
    },
    {
        label:"EMPLOYEE NAME",
        placeholder:"Employee Name",
        type:"drop",
        typeSelect:"empName",
        val:val1,
        func:func1,
    },
    {
        label:"GENDER",
        placeholder:"Gender",
        type:"drop",
        typeSelect:"empGender",
        val:val2,
        func:func2,
    },
    {
        label:"OCCUPATION",
        placeholder:"Occupation",
        type:"drop",
        typeSelect:"empOcc",
        val:val3,
        func:func3,
    },
  ],[val,func,val1,func1,val2,func2,val3,func3])

  const handleClick = (option:Options) =>{
        setFilter(option.empName || "")
    }
  const handleClick1 = (option:Options) =>{
    setGender(option.empGender || "")
  }
  const handleClick2 = (option:Options) =>{
    setOcc(option.empOcc || "")
  }

  const handleBlur = (index:number) =>{
    setFocus(null)
  }
  const handleFocus = (index:number) =>{
    setFocus(index)
  }

  return (
    <div className='flex py-3 justify-between '>
        <div className='flex gap-3'>
        {
          inputsFilter.map((item,index)=>{
            return (
                <div key={item.placeholder}>
                        <div className=" relative border-[1px] border-insomnia-primary rounded-md w-[200px]">
                            <input
                                 type="text" 
                                 name="username" 
                                 placeholder=" " 
                                 className={`block pl-2 p-1 w-full text-md appearance-none focus:outline-none bg-transparent ${darkMode ? "text-dark-lg-color" : ""}`} 
                                value={item.val}
                                onChange={item.func}
                                onFocus={()=>handleFocus(index)}
                            />
                            <label  className={`absolute top-0 text-md ${darkMode ? "bg-dark-box-color" : "bg-white"} p-4 -z-1 transform text-insomnia-primary scale-75 -translate-y-4 z-0 px-1 py-0 duration-300 origin-0`}>
                                {item.label}
                            </label>
                        </div>
                        <div className='w-[200px] relative'>
                            {
                                item.type === 'drop' && focus === index && suggesting.length > 0 && (
                                    <>
                                    {
                                        item.val && suggesting.length > 0 && (
                                            <ul className='absolute rounded-md border-[1px] shadow-md bg-white pl-2  py-1 w-full mt-2'>
                                                {
                                                    suggesting.map((op)=>{
                                                        return(
                                                            <li key={op.id} className='cursor-pointer' onClick={()=>{
                                                            handleBlur(index)
                                                            item.typeSelect === "empName" ? 
                                                                handleClick(op)
                                                            : item.typeSelect === "empGender" ? 
                                                                handleClick1(op)
                                                            :
                                                                handleClick2(op)
                                                            }}>
                                                                {item.typeSelect === "empName" ? op.empName : item.typeSelect === "empGender" ? op.empGender : op.empOcc}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        )
                                    }
                                    </>
                                )
                            }
                        </div>
                </div>
                
            )
          })
        }
        </div>
        
        <div className='flex justify-center py-1 items-center h-[35px] border border-blue-gray-200 rounded-[7px]'>
            <button className='bg-insomnia-primary h-full mx-1 rounded w-[26px] flex justify-center items-center' onClick={onclick}>
                <RiArrowGoBackFill color='white'/>
            </button>
        </div>
    </div>
  )
}

export default EmpTop