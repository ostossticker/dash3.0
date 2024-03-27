"use client"
import useToggle from '@/hooks/stores'
import React from 'react'
import {RiArrowGoBackFill} from 'react-icons/ri'

type topProps = {
  children:React.ReactNode;
  text:string;
  classname?:string;
  topTitle:string
}

const Top = ({topTitle,text,classname,children,...props}:topProps) => {
  const { darkMode } = useToggle()
  return (
    <>
    <div className='flex justify-between px-1'>
        <h1 className={`font-bold ${darkMode ? "text-dark-lg-color" : ""} text-[30px]`}>{text}</h1>
        <div className='flex items-center'>
        <button className='py-1 text-white bg-[#f79f5f] px-1 my-2 rounded-md mr-[5px]'>
        <RiArrowGoBackFill size={20}/>
        </button>
        <button className='font-bold py-[2px] text-white bg-[#f79f5f] px-3 my-2 rounded-md'>
          Note
        </button>
      
        </div>
    </div>
    <div {...props} className={`${darkMode? "bg-dark-box-color" : "bg-[#ffffff] "}
    rounded-lg shadow-md mt-[20px]
    ${classname}`}>
  
      <div className='pt-4 px-[20px] text-insomnia-primary rounded-t-lg text-[20px] font-semibold'>
       {topTitle}
      </div>
        <div className='p-6'>
        {children}
        </div>
    </div>
    </>
  )
}

export default Top