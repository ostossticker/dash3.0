"use client"
import useToggle from '@/hooks/stores';
import dynamic from 'next/dynamic';
import React from 'react'
import { MdOutlineArrowDropDown } from "react-icons/md";
const Chart = dynamic(()=>import('react-apexcharts'),{ssr:false})
const Charts = () => {
    const { isOpen , isHover ,darkMode} = useToggle()
    const option = {
        chart: {
          toolbar:{
            show:false
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 5,
            colors: ["#44b1f7", "#ffc400"],
            strokeColor: ["#d8efff","#ff8f00"],
            strokeWidth: 3
          },
          fill: {
            type: 'solid',
            colors: ['transparent'],
          },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          labels:{
            style:{
              colors:darkMode ? "#F0F7FF" : ""
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: darkMode ? '#F0F7FF' : '', 
            },
          },
        },
        legend:{
          labels:{
            colors:darkMode ? "#F0F7FF" : ""
          }
        },
        colors: ["#44b1f7", "#ffc400"]
      }

    const series = [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    
      },
      {
        name: 'series-2',
        data: [2, 4, 5, 50, 4, 80, 72, 92, 145],
        // Define line color for Series 2
      }
    ]
  return (
    <div className={`${darkMode ? "bg-dark-box-color" : "bg-white"} rounded-lg px-[30px] pb-[10px] shadow-md w-full`}>
        <div className='flex items-center pt-[30px] justify-between'>
            <h1 className={`text-[25px] ${darkMode ? "text-dark-lg-color" : "text-[#1a3158]"}`}>Summary Sales</h1>
            <div className='flex gap-5'>
                <div className='flex'>
                    <label className={`${darkMode ? "text-dark-sm-color" : "text-[#a6afc7]"} pr-2`}>from</label>
                    <div>
                        <div className='flex items-center'>
                            <p className={darkMode ? "text-dark-lg-color" : "text-[#1a3158]"}>August</p>
                            <MdOutlineArrowDropDown color={darkMode ? "#F0F7FF" : ""}/>
                        </div>
                        <select className="text-[#1a3158]" style={darkMode ? {backgroundColor:"#262B49",color:"#F0F7FF"} : {}}>
                            <option value="">2018</option>
                        </select>
                    </div>
                </div>
                <div className='flex'>
                        <label className={`${darkMode ? "text-dark-sm-color" : "text-[#a6afc7]"} pr-2`}>to</label>
                        <div>
                            <div className='flex items-center'>
                                <p className={darkMode ? "text-dark-lg-color" : "text-[#1a3158]"}>May</p>
                                <MdOutlineArrowDropDown color={darkMode ? "#F0F7FF" : ""}/>
                            </div>
                            <select className="text-[#1a3158]" style={darkMode ? {backgroundColor:"#262B49",color:"#F0F7FF"} : {}}>
                                <option value="">2019</option>
                            </select>
                        </div>
                </div>
            </div>
        </div>
        <Chart type="area"  options={option} series={series} height={isOpen || isHover ? "373px" : "400px"} width="100%" />
    </div>
  )
}

export default Charts