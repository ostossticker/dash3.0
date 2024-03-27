"use client"
import useToggle from '@/hooks/stores';
import React, { useMemo } from 'react'
import {FaPenAlt, FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineArrowDropDown } from "react-icons/md";

type tableProps = {
  children?:React.ReactNode;
}

const InvTable = ({children}:tableProps) => {
  const { isOpen , isHover ,darkMode} = useToggle()
  const thead = useMemo(()=>[
    {
      label:"NO." ,
      textAlign:""   
    },
    {
      label:"INVOICE#",
      textAlign:""
    },
    {
      label:"TITLE",
      textAlign:""
    },
    {
      label:"CUSTOMER",
      textAlign:""
    },
    {
      label:"BUSINESS",
      textAlign:""
    },
    {
      label: "STATUS",
      textAlign:""
    },
    {
        label:"CREATE DATE",
        textAlign:""
    },
    {
        label:"UPDATE DATE",
        textAlign:""
    },
    {
        label:"ACTIONS",
        textAlign:""
    }
  ],[])

  const placeholderData = useMemo(()=>[
    {
      invno:"#1200",
      title:"something",
      cus:"dwajdajwd",
      bus:"grab",
      status:"paid",
      start:"12-2-2024",
      end:"12-3-2024"
    }
  ],[])

  const placeholderClass = `${isOpen || isHover ? "py-[5px]" : "py-[7px]"} text-start text-[13px]`

  const classes = "bg-[#f79f5f] text-white w-[30px] h-[30px] rounded-md mx-1"

  return (
    <div className={`${darkMode ? "bg-dark-box-color" : "bg-white"} mt-[20px] shadow-md rounded-lg px-[30px] ${isOpen || isHover ? "py-[8px]" : "py-[10px]"}`}>
        {
          children
        }
        <table className='w-full mt-[10px]'>
            <thead>
              <tr>
                {
                  thead?.map((item)=>{
                    return(
                      <th key={item.label} className={`${item.textAlign} text-white bg-[#f79f5f] text-[14px]`}>{item.label}</th>
                    )
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                placeholderData?.map((item,i)=>{
                  return(
                  <tr key={item.invno} className={darkMode ? `${i % 2 === 0 ? ' bg-dark-box-color ' : 'bg-dark-table-row'} text-dark-lg-color` : `${i % 2 === 0 ? 'bg-white' : ' bg-gray-100'}`}>
                    <td className={placeholderClass}>{i + 1}</td>
                    <td className={placeholderClass}>{item.invno}</td>
                    <td className={placeholderClass}>{item.title}</td>
                    <td className={placeholderClass}>{item.cus}</td>
                    <td className={placeholderClass}>{item.bus}</td>
                    <td className={placeholderClass}>{item.status}</td>
                    <td className={placeholderClass}>{item.start}</td>
                    <td className={placeholderClass}>{item.end}</td>
                    <td className={placeholderClass}>
                        <div className='flex justify-center items-center gap-1'>
                        <button className='bg-insomnia-primary p-1 rounded'>
                            <FaPenAlt size={20}/>
                        </button>
                        <button className='bg-red-400 p-1 rounded'>
                            <FaRegTrashAlt size={20}/>
                        </button>
                        </div>
                    </td>
                  </tr>
                  )
                })
              }
              {
                (()=>{
                  let row = []
                  for(let i = 6; i > placeholderData.length; i--){
                    row.push(
                      <tr key={i * Date.now()} className={darkMode ? `${i % 2 === 0 ? '  bg-dark-table-row' : 'bg-dark-box-color'} text-dark-lg-color` : `${i % 2 === 0 ? ' bg-gray-100' : ' bg-white'}`}>
                        <td className={placeholderClass}><div className='invisible'>-</div></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                      </tr>
                    )
                  }
                  return row;
                })()
              }
            </tbody>
        </table>
        {/****************** */}
        <div className='flex justify-between pb-[14px]'>
        <div className='flex px-[5px] rounded-md items-center mt-[16px] bg-[#f79f5f] h-[30px] text-white'>
                <p>row:5</p><MdOutlineArrowDropDown/>
            </div>
          <div className='flex mt-[16px]'>
            <button className={classes}>{"<"}</button>
            <button className={classes}>1</button>
            <button className={classes}>2</button>
            <button className={classes}>3</button>
            <button className={classes}>{">"}</button>
          </div>
          
        </div>
        {/****************** */}
    </div>
  )
}

export default InvTable