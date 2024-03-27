"use client"
import useToggle from '@/hooks/stores';
import React, { useCallback, useEffect, useMemo} from 'react'
import { useMediaQuery } from 'react-responsive';
import {motion} from 'framer-motion'

// * React icons
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbFileInvoice} from "react-icons/tb";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { MdPeopleOutline } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { AiOutlineDollar } from "react-icons/ai";
import {MdAdminPanelSettings} from 'react-icons/md'
import { FaRecycle } from "react-icons/fa";
import { TfiReceipt } from "react-icons/tfi";

import { useRouter } from 'next/navigation';
import MenuButton from '../SidebarComps/HamburgerIcon';
import SearchInput from '../SidebarComps/SearchInput';
import Profile from '../SidebarComps/Profile';
import Image from 'next/image';

type layoutProps = {
  children: React.ReactNode
  auth:boolean
}

const Sidebar = ({children,auth}:layoutProps) => {
  const router = useRouter()
  let isTabletMid = useMediaQuery({query:"(max-width:768px)"});
  
  ///end theme changer
  const {
    darkMode,
    onOpen , 
    onClose , 
    isOpen, 
    toggle , 
    isHover , 
    onCloseHover , 
    onOpenHover,
    links,
    print,
    changeLink
  } = useToggle()

  useEffect(()=>{
    if(isTabletMid){
      onOpen()
    }else{
        onClose()
    }
  },[isTabletMid])

  useEffect(()=>{
    document.body.style.backgroundColor = darkMode ? "#1C2039" : "#f5f6fa";
  },[darkMode])

  const nav_animation = isTabletMid 
  ? {
    open: {
      x: 0,
      width: "16rem",
      transition: {
        damping: 40,
      },
    },
    closed: {
      x: -250,
      width: 0,
      transition: {
        damping: 40,
        delay: 0.15,
      },
    },
  }
: {
    open: {
      width: "16rem",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: "4rem",
      transition: {
        damping: 40,
      },
    },
  };

  const handleHover = () =>{
    if(!isOpen){
      onOpenHover()
    }
  }

  const handleLeave = () =>{
    if(!isOpen){
      onCloseHover()
    }
  }

  const handle = useCallback((e:string)=>{
    router.push(e)
    changeLink(e)
  },[router,changeLink])
 
  const leftMenu = useMemo(()=> [
    {
      label:"Menu",
      menus:[
        {
          icon:LuLayoutDashboard ,
          name:"Dashboard",
          class:'',
          link:"/dashboard"
        },
        {
          icon:LiaFileInvoiceDollarSolid ,
          name:"Invoice",
          class:"mt-2.5",
          link:"/invoice/table"
        },
        {
          icon:TbFileInvoice,
          name:"Quotation",
          class:"mt-2.5",
          link:"/quotation/table"
        },
        {
          icon:TfiReceipt,
          name:"Receipt",
          class:"mt-2.5",
          link:"/receipt/table"
        }
      ]
    },
    {
      label:"Management",
      class:"pt-5",
      menus:[
        {
          icon:MdOutlineBusinessCenter ,
          name:"Business",
          class:'',
          link:"/bussiness/table"
        },
        {
          icon:IoPeopleOutline ,
          name:"Employee",
          class:"mt-2.5",
          link:"/employee/table"
        },
        {
          icon:MdPeopleOutline,
          name:"Customer",
          class:"mt-2.5",
          link:"/customer/table"
        },
        {
          icon: BsBoxSeam,
          name:"Product",
          class:"mt-2.5",
          link:"/product/table"
        },
        {
          icon: BiPurchaseTagAlt,
          name:"Purchase",
          class:"mt-2.5",
          link:"/purchase/table"
        },
        
        {
          icon:AiOutlineDollar,
          name:"Payment",
          class:"mt-2.5",
          link:"/payment/table"
        },
       
      ]
    },
    {
      label:"Others",
      class:"pt-5",
      menus:[
        {
          icon:FaRecycle,
          name:"Recycles",
          class:"mt-2.5",
          link:"/recycle/table"
        },
        {
          icon: MdAdminPanelSettings,
          name:"Admin",
          class:"mt-2.5",
          link:"/admin"
        },
      ]
    },
    
  ],[])


  return (
    <div className={auth ? "flex" : "hidden"}>
      {/*w-[14rem] h-full xl:h-screen lg:h-screen md:h-screen max-w-[14rem]**/}
       {/*overflow-hidden top-0 fixed md:top-0 md:sticky lg:top-0 lg:sticky*/}
    <div>
        <div onClick={()=>{
          onCloseHover()
          onClose()
        }} className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${isOpen? "block" : "hidden"}`}>
          
        </div>
       <motion.div
       variants={nav_animation}
       initial={{ x: isTabletMid ? -250 : 0 }}
        animate={isOpen || isHover ? "open" : "closed"}
       className={` ${darkMode ? "bg-dark-sidebar" : "bg-white"} text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem]
       overflow-hidden top-0 fixed md:top-0 md:sticky lg:top-0 lg:sticky h-screen`}
       
       
       onMouseEnter={handleHover}
       onMouseLeave={handleLeave}
       >
        <div className='flex items-center gap-2.5 font-medium py-3 mx-3'>
          <Image
              src="/insomnia.png"
              width={45}
              height={45}
              alt=""
            />
            <span className={`text-xl whitespace-pre ${darkMode? "text-dark-lg-color" : ""}`}>Insomnia</span>
        </div>
        <div className='flex flex-col h-full'>
          <ul className={`whitespace-pre 
          px-2.5 
          text-[0.9rem] 
          pb-5 flex 
          flex-col 
          gap-1  
          font-medium 
          overflow-x-hidden 
          scrollbar-thin 
          ${darkMode ? "scrollbar-track-dark-box-color scrollbar-thumb-dark-sm-color" : "scrollbar-track-white scrollbar-thumb-slate-100"}
          
          
          md:h-[68%] h-[70%]`}>
            {
              leftMenu?.map((item)=>{
                return(
                  <li key={item.label}>
                    {
                      (isOpen || isHover || isTabletMid) && (
                        <div className={`${darkMode ? "text-dark-lg-color" : "text-gray-900"}  pt-[20px] pb-2.5  p-2.5 text-lg ${item.class}`}>
                          {item.label}
                        </div>
                      )
                    }
                    {
                      item.menus.map((subItem)=>{
                        return(
                          <div key={subItem.name} className={`link 
                          ${subItem.class} 
                          ${isOpen || isHover ? "pl-[30px] pr-2.5" : "px-2.5"} py-2 text-[#b1b8ce] 
                          ${links === subItem.link ? "active" : ""}`} onClick={()=>handle(subItem.link)}>
                            <subItem.icon size={23} className="min-w-max" color={links === subItem.link ? 'white':'#b1b8ce' }/>
                            {subItem.name}
                          </div>
                        )
                      })
                    }
                    
                  </li>
                )
              })
            }
            
            


          </ul>
        
          {isOpen || isHover ? (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div className={darkMode ? "text-dark-lg-color" : ""}>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          ) : (
            <></>
          )
        }
          
        </div>
        
       </motion.div>
       <div className="m-3 md:hidden " onClick={onOpen}>
       <MenuButton
            isOpen={isOpen}
            onClick={toggle}
            toggleMode={darkMode}
          />
      </div>
    </div>
    {/***************************************************** */}
    <div className='w-full'>
        <header className={isTabletMid || print ? "hidden" : "top-0 sticky z-10"}>
          <motion.nav
          initial={false}
          animate={isOpen || isHover ? "open" : "closed"}
          custom="100%"
          className={`flex justify-between items-center h-18 p-2 transition-all duration-300 ${darkMode ? "bg-dark-sidebar" : "bg-[#fefefe]"}`}
          > 
          <div className='flex justify-center items-center'>
          <MenuButton
            isOpen={isOpen}
            onClick={toggle}
            toggleMode={darkMode}
          />
          {/********************** */}
          <SearchInput/>
          {/********************** */}
          </div>
          <div className='flex justify-center items-center'>
            <Profile
            toggleMode={
              darkMode
            }
            />
          </div>
          </motion.nav>
        </header>
        <main className='lg:p-10'>
            {children}
          </main>
    </div>
        
    </div>
  )
}

export default Sidebar