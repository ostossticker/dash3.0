"use client"
import useToggle from '@/hooks/stores'
import React, { useMemo } from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri';

const InvTop = () => {
  const {darkMode} = useToggle()

  const inputsFilter = useMemo(()=>[
    {
        label:"FILTER",
        placeholder:"Search...",
        type:"text",
        list:"",
        data:[
            ""
        ]
    },
    {
        label:"FILTER",
        placeholder:"Business",
        type:"drop",
        list:"bus",
        data:[
            "car",
            "ktv"
        ]
    },
    {
        label:"FILTER",
        placeholder:"Status",
        type:"drop",
        list:"stat",
        data:[
            "paid",
            "unpaid"
        ]
    }
  ],[])
  
  return (
    <div className='flex py-3 justify-between '>
        <div className='flex gap-3'>
            {
                inputsFilter.map((item)=>{
                    return(
                        <div key={item.label} className='relative flex h-10 w-full min-w-[100px] max-w-[24rem]'>
                            <button
                            className="!absolute right-1 top-1 z-10 select-none rounded bg-insomnia-primary py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                            type="button"
                            data-ripple-light="true"
                            >
                                {item.label}
                            </button>
                            <input
                                type="email" list={item.list}
                                className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-insomnia-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                                    darkMode ? "text-dark-lg-color" : ""
                                }`}
                                placeholder=" "
                                required
                            />
                            <label className={`before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-insomnia-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-insomnia-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-insomnia-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 ${
                                darkMode ? "text-dark-lg-color" : ""
                            }`}>
                                {item.placeholder}
                            </label>
                            {
                                item.type === "drop"  && (
                                    <datalist id={item.list}>
                                    {
                                        item.data.map((idem)=>{
                                            return(
                                                <option key={idem}>
                                                    {idem}
                                                </option>
                                            )
                                        })
                                    }
                                    </datalist>
                                )
                            }
                        </div>
                    )
                })
            }
    
            <div className='flex justify-center py-1 items-center h-10 border border-blue-gray-200 rounded-[7px] px-1'>
                <div><input type="date" className={`w-[150px] bg-transparent ${darkMode ? "text-white dark" : "light"}`}/></div>
                
                <button className=' h-full mx-1 rounded w-[30px] flex justify-center items-center text-insomnia-primary'>To</button>
                
                <div><input type="date" className={`w-[150px] bg-transparent ${darkMode ? "text-white dark" : "light"}`}/></div>
            </div>
        </div>
        <div className='flex gap-3'>
        <div className='flex justify-center py-1 items-center h-10 border border-blue-gray-200 rounded-[7px]'>
            <button className='bg-insomnia-primary h-full mx-1 rounded w-[30px] flex justify-center items-center'>
                <RiArrowGoBackFill color='white'/>
            </button>
        </div>
        </div>
    </div>
  )
}

export default InvTop