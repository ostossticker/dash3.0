"use client"
import React from 'react'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowDropUp } from "react-icons/md";

//all summaries icons
import { IoCart } from 'react-icons/io5';
import { IoPersonSharp } from 'react-icons/io5';
import { IoWalletSharp } from 'react-icons/io5';
import { BsFillPersonXFill } from 'react-icons/bs';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { FaHandshakeSimple } from 'react-icons/fa6';
import NumberEffect from './number_effects/numberEffect';
import Percentage from './number_effects/percentage';
import useToggle from '@/hooks/stores';

const TopStat = () => {
  const { darkMode , isHover , isOpen} = useToggle()
  const allSummaries = [
    {
        status:"Earnings",
        percentage:382,
        icon:IoCart,
        iconColor:"#44b1f7",
        iconBorderColor:"bg-[#d8efff]",
        stat:6.2,
        upDownIcon:MdOutlineArrowDropUp,
        statIcon:"#37dbc5",
        statClass:"text-[#37dbc5]", 
        label:"Daily Sales"
    },
    {
        status:"Earnings",
        percentage:483,
        icon:IoPersonSharp,
        iconColor:"#5ec495",
        iconBorderColor:"bg-[#bfedd8]",
        stat:5.5,
        upDownIcon:MdOutlineArrowDropUp,
        statIcon:"#37dbc5",
        statClass:"text-[#37dbc5]", 
        label:"Total Sales"
    },
    {
        status:"Decrease",
        percentage:870,
        icon:IoWalletSharp,
        iconColor:"#f79f5f",
        iconBorderColor:"bg-[#fff1e8]",
        stat:7.9,
        upDownIcon:MdOutlineArrowDropDown,
        statIcon:"#ff807f",
        statClass:"text-[#ff807f]", 
        label:"Payments"
    },
    {
        status:"Earning",
        percentage:923,
        icon:BsFillPersonXFill,
        iconColor:"#ff5656",
        iconBorderColor:"bg-[#fcdede]",
        stat:17,
        upDownIcon:MdOutlineArrowDropUp,
        statIcon:"#37dbc5",
        statClass:"text-[#37dbc5]", 
        label:"Unpaid"
    },
    {
        status:"Decrease",
        percentage:323,
        icon:FaMoneyCheckAlt,
        iconColor:"#c475fc",
        iconBorderColor:"bg-[#f5e8ff]",
        stat:5,
        upDownIcon:MdOutlineArrowDropDown,
        statIcon:"#ff807f",
        statClass:"text-[#ff807f]", 
        label:"Expenses"
    },
    {
        status:"Earning",
        percentage:533,
        icon:FaHandshakeSimple,
        iconColor:"#25e1d0",
        iconBorderColor:"bg-[#b7f3ee]",
        stat:33,
        upDownIcon:MdOutlineArrowDropUp,
        statIcon:"#37dbc5",
        statClass:"text-[#37dbc5]", 
        label:"Customer"
    },
    
  ]

  
  return (
    <div className='grid grid-cols-6 gap-10'>
        {
            allSummaries?.map((item)=>{
                return(
                    <div key={item.label} className={
                        `
                        lg:col-span-1
                        col-span-6 
                        rounded-lg 
                        ${darkMode ? "bg-dark-box-color" : "bg-[#ffffff] "}
                        flex
                        justify-between
                        p-6
                        shadow-md
                        `
                    }>
                        <div>
                            <p className={`${darkMode? "text-dark-md-color" : "text-[#c3c9da]"} text-[12px]`}>{item.status}</p>
                            <NumberEffect classes={`${darkMode ? "text-dark-lg-color" : "text-[#1a3158]"} text-[25px] font-semibold`} nums={item.percentage} interval={1} />
                            <div className='flex items-center text-[12px]'>
                            <item.upDownIcon size={13} color={item.statIcon}/>
                            <Percentage classes={item.statClass} nums={item.stat} interval={90}/>
                            </div>
                            <p className={`${darkMode ? "text-dark-sm-color" : "text-[#bdbec2]"} text-[12px]`}>{item.label}</p>
                        </div>
                        <item.icon size={isHover || isOpen ? 38 : 45} className={`${item.iconBorderColor} rounded-full p-2`} color={item.iconColor}/>
                    </div>
                )
            })
        }
    </div>
  )
}

export default TopStat