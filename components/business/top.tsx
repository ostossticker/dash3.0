"use client"
import useToggle from '@/hooks/stores';
import React, { useMemo } from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri';

type customerTopProps = {
  val?:string;
  func?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  onclick?:()=>void;
  suggesting:Options[];
  setFilter:React.Dispatch<React.SetStateAction<string>>;
}

type Options = {
    id:string;
    busName:string;
    busEmail:string;
}

const Bustop = ({val , func,onclick,suggesting,setFilter}:customerTopProps) => {
  const { darkMode } = useToggle()

    const inputsFilter = useMemo(()=>[
      {
          label:"FILTER",
          placeholder:"Search...",
          type:"drop",
          val:val,
          func:func,
      },
    ],[val , func])

    const handleClick = (option:Options) =>{
        setFilter(option.busName || "")
    }
  return (
    <div className='flex py-3 justify-between gap-3'>
        {
          inputsFilter.map((item)=>{
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
                            />
                            <label  className={`absolute top-0 text-md ${darkMode ? "bg-dark-box-color" : "bg-white"} p-4 -z-1 transform text-insomnia-primary scale-75 -translate-y-4 z-0 px-1 py-0 duration-300 origin-0`}>
                                {item.label}
                            </label>
                        </div>
                        <div className='w-[200px] relative'>
                            {
                                item.type === 'drop' && (
                                    <>
                                    {
                                        item.val && suggesting.length > 0 && (
                                            <ul className='absolute rounded-md border-[1px] shadow-md bg-white pl-2  py-1 w-full mt-2'>
                                                {
                                                    suggesting.map((op)=>{
                                                        return(
                                                            <li key={op.id} onClick={()=>handleClick(op)}>
                                                                {op.busName}
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
        <div className='flex justify-center py-1 items-center h-[35px] border border-blue-gray-200 rounded-[7px]'>
            <button className='bg-insomnia-primary h-full mx-1 rounded w-[26px] flex justify-center items-center' onClick={onclick}>
                <RiArrowGoBackFill color='white'/>
            </button>
        </div>

    </div>
  )
}

export default Bustop