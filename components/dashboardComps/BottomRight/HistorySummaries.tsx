"use client"
import useToggle from '@/hooks/stores';
import React from 'react'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowDropUp } from "react-icons/md";
import NumberEffect from '../number_effects/numberEffect';
const HistorySummaries = () => {
  const { isOpen , isHover ,darkMode} = useToggle()
  const placeholderData = [
    {
        day:"Today",
        Icon:MdOutlineArrowDropUp,
        iconColor:"#37dbc5"
    },
    {
        day:"Yesterday",
        Icon:MdOutlineArrowDropDown,
        iconColor:"#ff807f"
    },
    
  ]

  const placeholderClass = `text-start ${isOpen || isHover ? "py-[8px]" : "py-[10px]"} ${darkMode ? "text-dark-lg-color" : ""}`

  return (
    <div className={`${darkMode ? "bg-dark-box-color" : "bg-white"} shadow-md rounded-lg ${isOpen || isHover ? "h-[476px]" : "h-[503px]"} mt-[40px] px-[30px] pb-[10px]`}>
        <div className='flex items-center pt-[30px] justify-between'>
            <h1 className={`${isOpen || isHover ? "text-[23px]" : "text-[25px]"} ${darkMode ? "text-dark-lg-color" : "text-[#1a3158]"}`}>History</h1>
            <div className='flex items-center'>
                <p className={`${darkMode ? "text-dark-lg-color" : "text-[#1a3158]"} ${isOpen || isHover ? "text-[15px]" : ""}`}>Yesterday</p><MdOutlineArrowDropDown color={`${darkMode ? "white" : "black"}`}/>
            </div>
        </div>

        <div>
            <div>
                <NumberEffect classes={`font-bold ${isOpen || isHover ? "text-[28px]" : "text-[30px]"} ${darkMode ? "text-dark-lg-color" : ""}`} dollarTag={true} nums={300} interval={1}/>
               <p className={`${isOpen || isHover ? "text-[15px]" : "text-sm"} text-[#c3c9da]`}>Current Balance</p>
            </div>
            <table className='w-full'>
                <tbody>
                    {
                        placeholderData?.map((item)=>{
                            return(
                            <tr key={item.day}>
                                <td className={placeholderClass}><item.Icon size={20} color={item.iconColor}/></td>
                                <td className={placeholderClass}>{item.day}</td>
                                <td className={`text-end ${isOpen || isHover ? "py-[8px]" : "py-[10px]"} ${darkMode ? "text-dark-lg-color" : ""}`}>$300.00</td>
                            </tr>
                            )
                        })
                    }
                    {
                        (()=>{
                            let row = [];
                            for(let i = 6; i > placeholderData.length; i--){
                               row.push(
                                <tr key={i * Date.now()}>
                                    <td className={`${isOpen || isHover ? "py-[8px]" : "py-[10px]"} invisible`}>{"s"}</td>
                                    <td className={isOpen || isHover ? "py-[8px]" : "py-[10px]"}></td>
                                    <td className={isOpen || isHover ? "py-[8px]" : "py-[10px]"}></td>
                                </tr>
                               ) 
                            }
                            return row;
                        })()
                    }
                </tbody>
            </table>
            <div className='flex justify-end'>
                <button className={`text-[#c3c9da] pb-[10px] ${isOpen || isHover ? "text-[15px]" : ""}`}>More...</button>
            </div>
            <button className={`bg-[#f79f5f] w-full h-[45px] rounded-md font-semibold text-white ${isOpen || isHover ? "text-[15px]" : ""}`}>Print Daily Report</button>
        </div>
    </div>
  )
}

export default HistorySummaries